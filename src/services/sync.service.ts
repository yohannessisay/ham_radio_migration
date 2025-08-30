// services/sync.service.ts
import { getFirestore, collection, getDocs, limit, query, orderBy, startAfter } from "firebase/firestore";
import FirebaseService from "./firebase.service.js";
import { UserProfile } from "../models/user.model.js";
import { LogBook } from "../models/logbook.model.js"; 
import { LogbookContacts } from "../models/logbook_contacts.model.js";
import { Transaction, Op } from "sequelize";
import { sequelize } from "../config/db.config";

class SyncService {
  private db = getFirestore(FirebaseService.getInstance());

  // Normalize Firestore Timestamp/number/string into JS Date or null
  private toDate(value: any): Date | null {
    try {
      if (!value) return null;
      if (typeof value === "object" && typeof (value as any).seconds === "number") {
        return new Date((value as any).seconds * 1000);
      }
      if (typeof value === "number") {
        return new Date(value);
      }
      if (typeof value === "string") {
        const d = new Date(value);
        return isNaN(d.getTime()) ? null : d;
      }
      return null;
    } catch {
      return null;
    }
  }

  // Ensure JSONB-safe plain object (drops methods, symbols)
  private toJSON(value: any): any {
    try {
      if (value === undefined || value === null) return null;
      return JSON.parse(JSON.stringify(value));
    } catch {
      return null;
    }
  }

  // Ensure string[] for ARRAY columns
  private toStringArray(value: any): string[] {
    if (!Array.isArray(value)) return [];
    return value
      .filter((v) => v !== undefined && v !== null)
      .map((v) => String(v));
  }

  async syncUsersPaged(totalLimit = 10000, pageSize = 1000) {
    const usersCollection = collection(this.db, "UserProfile");
    let fetchedTotal = 0;
    let insertedTotal = 0;
    let lastDoc: any = null;

    while (fetchedTotal < totalLimit) {
      const pageLimit = Math.min(pageSize, totalLimit - fetchedTotal);
      const q = lastDoc
        ? query(usersCollection, orderBy("timestamp", "desc"), startAfter(lastDoc), limit(pageLimit))
        : query(usersCollection, orderBy("timestamp", "desc"), limit(pageLimit));

      const snapshot = await getDocs(q);
      if (snapshot.empty) break;

      const users = snapshot.docs.map((doc) => {
        const d = doc.data() as any;
        return {
          uid: d.uid || doc.id, // prefer explicit uid, fallback to doc.id if matches
          firstName: d.firstName || null,
          lastName: d.lastName || null,
          callSign: d.callSign || null,
          email: d.email || null,
          phoneNumber: d.phoneNumber || null,
          country: d.country || null,
          state: d.state || null,
          city: d.city || null,
          address: d.address || null,
          gridSquare: d.gridSquare || null,
          bio: d.bio || null,
          cqZone: typeof d.cqZone === "number" ? d.cqZone : (d.cqZone ? Number(d.cqZone) : null),
          ituZone: typeof d.ituZone === "number" ? d.ituZone : (d.ituZone ? Number(d.ituZone) : null),
          coordinates: this.toJSON(d.coordinates),
          nameSearchIndex: this.toStringArray(d.nameSearchIndex),
          callsignSearchIndex: this.toStringArray(d.callsignSearchIndex),
          timestamp: this.toDate(d.timestamp),
        };
      });

      fetchedTotal += users.length;
      lastDoc = snapshot.docs[snapshot.docs.length - 1];

      // Only process valid PKs
      const validUsers = users.filter((u) => !!u.uid);

      const t: Transaction = await sequelize.transaction();
      try {
        const uids = validUsers.map((u) => u.uid);
        if (uids.length) {
          const existing = await UserProfile.findAll({
            attributes: ["uid"],
            where: { uid: { [Op.in]: uids } },
            transaction: t,
            raw: true,
          });
          const existingSet = new Set(existing.map((e: any) => e.uid));
          const toInsert = validUsers.filter((u) => !existingSet.has(u.uid));
          const toUpdate = validUsers.filter((u) => existingSet.has(u.uid));

          if (toInsert.length) {
            await UserProfile.bulkCreate(toInsert, { transaction: t, validate: false, returning: false });
          }
          for (const u of toUpdate) {
            const { uid, ...rest } = u as any;
-            await UserProfile.update(rest, { where: { uid }, transaction: t });
+            await UserProfile.update(rest, { where: { uid }, transaction: t, validate: false });
          }
          insertedTotal += validUsers.length;
        }
        await t.commit();
      } catch (e) {
        await t.rollback();
        throw e;
      }

      if (users.length < pageLimit) break;
    }

    return { fetchedTotal, insertedTotal };
  }

  async syncLogBooksPaged(totalLimit = 10000, pageSize = 1000) {
    const logCollection = collection(this.db, "LogBook");
    let fetchedTotal = 0;
    let insertedTotal = 0;
    let lastDoc: any = null;

    while (fetchedTotal < totalLimit) {
      const pageLimit = Math.min(pageSize, totalLimit - fetchedTotal);
      const q = lastDoc
        ? query(logCollection, orderBy("timestamp", "desc"), startAfter(lastDoc), limit(pageLimit))
        : query(logCollection, orderBy("timestamp", "desc"), limit(pageLimit));

      const snapshot = await getDocs(q);
      if (snapshot.empty) break;

      const logs = snapshot.docs.map((doc) => {
        const d: any = doc.data();
        return {
          firebase_id: doc.id,
          uid: d.uid || d.userId || null,
          name: d.name || null,
          myAntenna: d.myAntenna || null,
          myRadio: d.myRadio || null,
          contactCount: typeof d.contactCount === "number" ? d.contactCount : (d.contactCount ? Number(d.contactCount) : 0),
          coordinates: this.toJSON(d.coordinates),
          timestamp: this.toDate(d.timestamp),
          lastContactTimestamp: this.toDate(d.lastContactTimestamp),
        };
      });

      fetchedTotal += logs.length;
      lastDoc = snapshot.docs[snapshot.docs.length - 1];

      const t: Transaction = await sequelize.transaction();
      try {
        const ids = logs.map((l) => l.firebase_id).filter(Boolean);
        if (ids.length) {
          const existing = await LogBook.findAll({
            attributes: ["firebase_id"],
            where: { firebase_id: { [Op.in]: ids } },
            transaction: t,
            raw: true,
          });
          const existingSet = new Set(existing.map((e: any) => e.firebase_id));
          const toInsert = logs.filter((l) => !existingSet.has(l.firebase_id));
          const toUpdate = logs.filter((l) => existingSet.has(l.firebase_id));

          if (toInsert.length) {
            await LogBook.bulkCreate(toInsert, { transaction: t, validate: false, returning: false });
          }
          for (const l of toUpdate) {
            const { firebase_id, ...rest } = l as any;
-            await LogBook.update(rest, { where: { firebase_id }, transaction: t });
+            await LogBook.update(rest, { where: { firebase_id }, transaction: t, validate: false });
          }
          insertedTotal += logs.length;
        }
        await t.commit();
      } catch (e) {
        await t.rollback();
        throw e;
      }

      if (logs.length < pageLimit) break;
    }

    return { fetchedTotal, insertedTotal };
  }

  async syncLogBookContactsPaged(totalLimit = 100000, pageSize = 2000) {
    const contactsCollection = collection(this.db, "LogBookContact");
    let fetchedTotal = 0;
    let insertedTotal = 0;
    let lastDoc: any = null;

    while (fetchedTotal < totalLimit) {
      const pageLimit = Math.min(pageSize, totalLimit - fetchedTotal);
      const q = lastDoc
        ? query(contactsCollection, orderBy("timestamp", "desc"), startAfter(lastDoc), limit(pageLimit))
        : query(contactsCollection, orderBy("timestamp", "desc"), limit(pageLimit));

      const snapshot = await getDocs(q);
      if (snapshot.empty) break;

      const contacts = snapshot.docs.map((doc) => {
        const data: any = doc.data();
        const contactTs = data.contactTimeStamp || data.contactTimestamp;
        return {
          firebase_id: doc.id,
          uid: data.uid || data.userId || null,
          logBookId: data.logBookId || null,
          theirCallsign: data.theirCallsign || null,
          profileCallSign: data.profileCallSign || null,
          myName: data.myName || null,
          myCallSign: data.myCallSign || null,
          userMode: data.userMode || null,
          band: data.band || null,
          country: data.country || null,
          myCountry: data.myCountry || null,
          myCity: data.myCity || null,
          myState: data.myState || null,
          userQth: data.userQth || null,
          flagCode: data.flagCode || null,
          userGrid: data.userGrid || null,
          myAntenna: data.myAntenna || null,
          myRadio: data.myRadio || null,
          callSignSearchIndex: this.toStringArray(data.callSignSearchIndex),
          continent: data.continent || null,
          distance: typeof data.distance === "number" ? data.distance : (data.distance ? Number(data.distance) : null),
          coordinates: this.toJSON(data.myCoordinates || data.coordinates),
          timestamp: this.toDate(contactTs) || this.toDate(data.timestamp),
          contactTimeStamp: this.toDate(contactTs),
          date: this.toDate(data.date),
          notes: data.notes || null,
          active: typeof data.active === "boolean" ? data.active : (typeof data.active === "string" ? data.active.toLowerCase() === "true" : null),
          nameSearchIndex: this.toStringArray(data.nameSearchIndex),
          myNameSearchIndex: this.toStringArray(data.myNameSearchIndex),
        };
      });

      fetchedTotal += contacts.length;
      lastDoc = snapshot.docs[snapshot.docs.length - 1];

      const t: Transaction = await sequelize.transaction();
      try {
        const ids = contacts.map((c) => c.firebase_id).filter(Boolean);
        if (ids.length) {
          const existing = await LogbookContacts.findAll({
            attributes: ["firebase_id"],
            where: { firebase_id: { [Op.in]: ids } },
            transaction: t,
            raw: true,
          });
          const existingSet = new Set(existing.map((e: any) => e.firebase_id));
          const toInsert = contacts.filter((c) => !existingSet.has(c.firebase_id));
          const toUpdate = contacts.filter((c) => existingSet.has(c.firebase_id));

          if (toInsert.length) {
            await LogbookContacts.bulkCreate(toInsert, { transaction: t, validate: false, returning: false });
          }
          for (const c of toUpdate) {
            const { firebase_id, ...rest } = c as any;
-            await LogbookContacts.update(rest, { where: { firebase_id }, transaction: t });
+            await LogbookContacts.update(rest, { where: { firebase_id }, transaction: t, validate: false });
          }
          insertedTotal += contacts.length;
        }
        await t.commit();
      } catch (e) {
        await t.rollback();
        throw e;
      }

      if (contacts.length < pageSize) break;
    }

    return { fetchedTotal, insertedTotal };
  }

  async syncAll(limitCount = 10000) {
    const usersRes = await this.syncUsersPaged(Math.max(limitCount, 10000), 1000);
    const logsRes = await this.syncLogBooksPaged(limitCount, 1000);
    const contactsRes = await this.syncLogBookContactsPaged(100000, 2000);

    return {
      usersFetched: usersRes.fetchedTotal,
      usersInserted: usersRes.insertedTotal,
      logsFetched: logsRes.fetchedTotal,
      logsInserted: logsRes.insertedTotal,
      contactsFetched: contactsRes.fetchedTotal,
      contactsInserted: contactsRes.insertedTotal,
    };
  }
}

export default new SyncService();
