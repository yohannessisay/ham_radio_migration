// services/sync.service.ts
import { getFirestore, collection, getDocs, limit, query, orderBy } from "firebase/firestore";
import FirebaseService from "./firebase.service.js";
import { UserProfile } from "../models/user.model.js";
import { LogBook } from "../models/logbook.model.js"; 
import { LogbookContacts } from "../models/logbook_contacts.model.js";

class SyncService {
  private db = getFirestore(FirebaseService.getInstance());

  /** Fetch all users from Firestore UserProfile collection */
  async fetchAllUsersFromFirestore() {
    const usersCollection = collection(this.db, "UserProfile");
    const snapshot = await getDocs(usersCollection);

    if (snapshot.empty) return [];

    return snapshot.docs.map(doc => ({
      firebase_id: doc.id,
      firstName: doc.data().firstName || null,
      lastName: doc.data().lastName || null,
      callSign: doc.data().callSign || null,
      email: doc.data().email || null,
      phoneNumber: doc.data().phoneNumber || null,
      country: doc.data().country || null,
      state: doc.data().state || null,
      city: doc.data().city || null,
      address: doc.data().address || null,
      gridSquare: doc.data().gridSquare || null,
      bio: doc.data().bio || null,
      cqZone: doc.data().cqZone || null,
      ituZone: doc.data().ituZone || null,
      coordinates: doc.data().coordinates || null,
      nameSearchIndex: doc.data().nameSearchIndex || [],
      callsignSearchIndex: doc.data().callsignSearchIndex || [],
      timestamp: doc.data().timestamp?.seconds
        ? new Date(doc.data().timestamp.seconds * 1000)
        : null,
    }));
  }

  /** Insert users into Postgres */
  async insertUsersIntoPostgres(users: any[]) {
    if (!users.length) return 0;
    const inserted = await UserProfile.bulkCreate(users, { ignoreDuplicates: true });
    return inserted.length;
  }

  /** Fetch logs from Firestore collection */
  async fetchLogsFromFirestore(limitCount = 10000) {
    const logCollection = collection(this.db, "LogBook");
    const logQuery = query(logCollection, orderBy("timestamp", "desc"), limit(limitCount));
    const snapshot = await getDocs(logQuery);

    if (snapshot.empty) return [];

    return snapshot.docs.map(doc => ({
      firebase_id: doc.id,
      user_firebase_id: doc.data().uid || doc.data().userId || null,
      name: doc.data().name || null,
      myAntenna: doc.data().myAntenna || null,
      myRadio: doc.data().myRadio || null,
      contactCount: doc.data().contactCount || 0,
      coordinates: doc.data().coordinates || null,
      timestamp: doc.data().timestamp?.seconds ? new Date(doc.data().timestamp.seconds * 1000) : null,
      lastContactTimestamp: doc.data().lastContactTimestamp?.seconds
        ? new Date(doc.data().lastContactTimestamp.seconds * 1000)
        : null,
    }));
  }

  /** Insert logs into Postgres */
  async insertLogsIntoPostgres(logs: any[]) {
    if (!logs.length) return 0;
    const inserted = await LogBook.bulkCreate(logs, { ignoreDuplicates: true });
    return inserted.length;
  }

  /** Fetch logbook contacts */
  async fetchLogBookContactsFromFirestore(limitCount = 100000) {
    const contactsCollection = collection(this.db, "LogBookContact");
    const contactsQuery = query(contactsCollection, orderBy("timestamp", "desc"), limit(limitCount));
    const snapshot = await getDocs(contactsQuery);

    if (snapshot.empty) return [];

    return snapshot.docs.map(doc => ({
      firebase_id: doc.id,
      user_firebase_id: doc.data().uid || doc.data().userId || null,
      logBookId: doc.data().logBookId || null,
      theirCallsign: doc.data().theirCallsign || null,
      profileCallSign: doc.data().profileCallSign || null,
      myName: doc.data().myName || null,
      myCallSign: doc.data().myCallSign || null,
      userMode: doc.data().userMode || null,
      country: doc.data().country || null,
      myCountry: doc.data().myCountry || null,
      myCity: doc.data().myCity || null,
      myState: doc.data().myState || null,
      coordinates: doc.data().myCoordinates || doc.data().coordinates || null,
      timestamp: doc.data().timestamp?.seconds ? new Date(doc.data().timestamp.seconds * 1000) : (doc.data().timestamp || null),
      notes: doc.data().notes || null,
    }));
  }

  /** Insert logbook contacts into Postgres */
  async insertContactsIntoPostgres(contacts: any[]) {
    if (!contacts.length) return 0;
    const inserted = await LogbookContacts.bulkCreate(contacts, { ignoreDuplicates: true });
    return inserted.length;
  }

  /** Full sync: Users, Logs, Contacts */
  async syncAll(limitCount = 10000) {
    // 1️⃣ Users
    // const users = await this.fetchAllUsersFromFirestore();
    // const usersInserted = await this.insertUsersIntoPostgres(users);

    // 2️⃣ LogBook
    const logs = await this.fetchLogsFromFirestore(limitCount);
    const logsInserted = await this.insertLogsIntoPostgres(logs);

    // 3️⃣ LogBookContact (fetch up to 100k)
    // const contacts = await this.fetchLogBookContactsFromFirestore(100000);
    // const contactsInserted = await this.insertContactsIntoPostgres(contacts);

    return {
      usersFetched: 0, 
      logsFetched: logs.length,
      logsInserted,
    //   contactsFetched: contacts.length,
    //   contactsInserted,
    };
  }
}

export default new SyncService();
