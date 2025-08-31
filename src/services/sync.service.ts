import {
  getFirestore,
  collection,
  getDocs,
  limit,
  query,
  orderBy,
  startAfter,
} from "firebase/firestore";
import FirebaseService from "./firebase.service.js";
import { UserProfile } from "../models/user.model.js";
import { LogBook } from "../models/logbook.model.js";
import { createHash } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { LogbookContacts } from "../models/logbook_contacts.model.js";

// Config
const PAGE_SIZE = 5000;
const MAX_FETCH = 100000;

class SyncService {
  private db = getFirestore(FirebaseService.getInstance());

  // Safely convert any value to Date | null
  private toDate(value: any): Date | null {
    try {
      if (!value) return null;

      // Firestore Timestamp
      if (typeof value === "object" && value !== null && "seconds" in value) {
        const seconds = Number(value.seconds);
        if (!isNaN(seconds)) return new Date(seconds * 1000);
      }

      // Unix timestamp (ms or s)
      if (typeof value === "number") {
        const date = new Date(value);
        return isNaN(date.getTime()) ? null : date;
      }

      // ISO string or date string
      if (typeof value === "string") {
        const date = new Date(value);
        return isNaN(date.getTime()) ? null : date;
      }

      return null;
    } catch {
      return null;
    }
  }

  // Safely convert to JSON, stripping Timestamps
  private toJSON(value: any): any {
    if (value === undefined || value === null) return null;

    const sanitize = (obj: any): any => {
      if (obj === null || obj === undefined) return null;

      if (typeof obj === "object") {
        // Firestore Timestamp
        if (
          "seconds" in obj &&
          "nanoseconds" in obj &&
          typeof obj.seconds !== "function"
        ) {
          const seconds = Number(obj.seconds);
          return isNaN(seconds) ? null : new Date(seconds * 1000);
        }

        if (Array.isArray(obj)) return obj.map(sanitize);
        const cleaned: any = {};
        for (const [k, v] of Object.entries(obj)) {
          cleaned[k] = sanitize(v);
        }
        return cleaned;
      }

      return obj;
    };

    const cleaned = sanitize(value);
    return cleaned === null ? null : JSON.parse(JSON.stringify(cleaned));
  }

  // Safe string array
  private toStringArray(value: any): string[] | null {
    if (!Array.isArray(value)) return null;
    return value
      .filter((v): v is string | number => v != null && v !== "")
      .map(String)
      .filter(Boolean);
  }

  // Safe number
  private toNumber(value: any): number | null {
    if (typeof value === "number" && !isNaN(value)) return value;
    const n = Number(value);
    return isNaN(n) ? null : n;
  }

  // Safe boolean
  private toBoolean(value: any): boolean | null {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") {
      return ["true", "1", "yes", "on"].includes(value.trim().toLowerCase());
    }
    return null;
  }

  // Generic mapper with total fault tolerance
  private mapUserProfile(data: any, docId: string): Partial<any> {
    const uid = data.uid || docId || null;

    return {
      firebase_id: uid,
      uid: uid,

      address: typeof data.address === "string" ? data.address : null,
      bio: typeof data.bio === "string" ? data.bio : null,
      callSign: typeof data.callSign === "string" ? data.callSign : null,
      callsignSearchIndex: this.toStringArray(data.callsignSearchIndex),
      city: typeof data.city === "string" ? data.city : null,
      continent: typeof data.continent === "string" ? data.continent : null,
      coordinates: this.toJSON(data.coordinates),
      country: typeof data.country === "string" ? data.country : null,
      countryCode:
        typeof data.countryCode === "string" ? data.countryCode : null,
      cqZone: this.toNumber(data.cqZone),
      dxccNumber: this.toNumber(data.dxccNumber),
      email: typeof data.email === "string" ? data.email : null,
      firstName: typeof data.firstName === "string" ? data.firstName : null,
      flagCode: typeof data.flagCode === "string" ? data.flagCode : null,
      gridSquare: typeof data.gridSquare === "string" ? data.gridSquare : null,
      ituZone: this.toNumber(data.ituZone),
      lastName: typeof data.lastName === "string" ? data.lastName : null,
      nameSearchIndex: this.toStringArray(data.nameSearchIndex),
      needsLocationOnboarding: this.toBoolean(data.needsLocationOnboarding),
      phoneNumber:
        typeof data.phoneNumber === "string" ? data.phoneNumber : null,
      provideId: typeof data.provideId === "string" ? data.provideId : null,
      state: typeof data.state === "string" ? data.state : null,
      timestamp: this.toDate(data.timestamp),

      lastContactModification: this.toDate(data.lastContactModification),
      needsAggregation: this.toBoolean(data.needsAggregation),
      numberOfContactsImported: this.toNumber(data.numberOfContactsImported),
      quota: this.toJSON(data.quota),
      savedLocationId:
        typeof data.savedLocationId === "string" ? data.savedLocationId : null,
      hasStreak: this.toBoolean(data.hasStreak),
      streakStats: this.toJSON(data.streakStats),
      contests: this.toStringArray(data.contests),
      stripeId: typeof data.stripeId === "string" ? data.stripeId : null,
      stripeLink: typeof data.stripeLink === "string" ? data.stripeLink : null,
      foundingMemberCount: this.toNumber(data.foundingMemberCount),
      membershipStatus:
        typeof data.membershipStatus === "string"
          ? data.membershipStatus
          : null,
      numberOfContacts: this.toNumber(data.numberOfContacts),
      settings: this.toJSON(data.settings),
      spottingFilters: this.toJSON(data.spottingFilters),
      subscriptionCanceledAt:
        typeof data.subscriptionCanceledAt === "string"
          ? data.subscriptionCanceledAt
          : null,
      subscriptionCancelOnPeriodEnd:
        typeof data.subscriptionCancelOnPeriodEnd === "string"
          ? data.subscriptionCancelOnPeriodEnd
          : null,
      subscriptionCreatedAt:
        typeof data.subscriptionCreatedAt === "string"
          ? data.subscriptionCreatedAt
          : null,
      subscriptionEndedAt:
        typeof data.subscriptionEndedAt === "string"
          ? data.subscriptionEndedAt
          : null,
      subscriptionStatus:
        typeof data.subscriptionStatus === "string"
          ? data.subscriptionStatus
          : null,
      bands: this.toJSON(data.bands),
      modes: this.toJSON(data.modes),
      longBio: typeof data.longBio === "string" ? data.longBio : null,
      stateLongName:
        typeof data.stateLongName === "string" ? data.stateLongName : null,
      admin: this.toBoolean(data.admin),
      autoExportToQrzLotw: this.toBoolean(data.autoExportToQrzLotw),
      defaultLogbookSettings: this.toJSON(data.defaultLogbookSettings),
      facebook: typeof data.facebook === "string" ? data.facebook : null,
      instagram: typeof data.instagram === "string" ? data.instagram : null,
      linkedin: typeof data.linkedin === "string" ? data.linkedin : null,
      profilePic: typeof data.profilePic === "string" ? data.profilePic : null,
      twitter: typeof data.twitter === "string" ? data.twitter : null,
      activator: this.toJSON(data.activator),
      activityGraphRepaired: this.toBoolean(data.activityGraphRepaired),
      bugCount: this.toNumber(data.bugCount),
      hunter: this.toJSON(data.hunter),
      spotsCreated: this.toNumber(data.spotsCreated),
    };
  }

  private mapLogBook(data: any, docId: string): Partial<any> {
    const uid = data.uid || data.userId || docId || null;

    return {
      firebase_id: docId, // Use Firestore doc ID as unique key
      uid: uid,
      id: uuidv4(),
      name: typeof data.name === "string" ? data.name : null,
      myAntenna: typeof data.myAntenna === "string" ? data.myAntenna : null,
      myRadio: typeof data.myRadio === "string" ? data.myRadio : null,
      contactCount: this.toNumber(data.contactCount),
      coordinates: this.toJSON(data.coordinates),
      timestamp: this.toDate(data.timestamp),
      lastContactTimestamp: this.toDate(data.lastContactTimestamp),

      // Optional fields
      defaultLocation: this.toJSON(data.defaultLocation),
      defaultCallSign:
        typeof data.defaultCallSign === "string" ? data.defaultCallSign : null,
      callSignType:
        typeof data.callSignType === "string" ? data.callSignType : null,
      logbookStyle:
        typeof data.logbookStyle === "string" ? data.logbookStyle : null,
      myParks: this.toJSON(data.myParks),
      assisted: typeof data.assisted === "string" ? data.assisted : null,
      contestBand:
        typeof data.contestBand === "string" ? data.contestBand : null,
      contestPower:
        typeof data.contestPower === "string" ? data.contestPower : null,
      defaultBand:
        typeof data.defaultBand === "string" ? data.defaultBand : null,
      defaultFrequency:
        typeof data.defaultFrequency === "string"
          ? data.defaultFrequency
          : null,
      defaultMode:
        typeof data.defaultMode === "string" ? data.defaultMode : null,
      defaultPower:
        typeof data.defaultPower === "string" ? data.defaultPower : null,
      description:
        typeof data.description === "string" ? data.description : null,
      numberOfTransmitters:
        typeof data.numberOfTransmitters === "string"
          ? data.numberOfTransmitters
          : null,
      operator: typeof data.operator === "string" ? data.operator : null,
      adiFile: typeof data.adiFile === "string" ? data.adiFile : null,
      adiFileCopy:
        typeof data.adiFileCopy === "string" ? data.adiFileCopy : null,
      adiImported: this.toBoolean(data.adiImported),
      duplicateContacts: this.toNumber(data.duplicateContacts),
      errorCode: typeof data.errorCode === "string" ? data.errorCode : null,
      failedContacts: this.toNumber(data.failedContacts),
      fileName: typeof data.fileName === "string" ? data.fileName : null,
      importDate: this.toDate(data.importDate),
      importStatus:
        typeof data.importStatus === "string" ? data.importStatus : null,
      locked: this.toBoolean(data.locked),
      successContacts: this.toNumber(data.successContacts),
      totalImportContacts: this.toNumber(data.totalImportContacts),
      contest: this.toJSON(data.contest),
      contestId: typeof data.contestId === "string" ? data.contestId : null,
      firstImport: this.toBoolean(data.firstImport),
      lastSpottedAt: this.toDate(data.lastSpottedAt),
      lastSpottedBand:
        typeof data.lastSpottedBand === "string" ? data.lastSpottedBand : null,
      lastSpottedComment:
        typeof data.lastSpottedComment === "string"
          ? data.lastSpottedComment
          : null,
      lastSpottedFrequency: this.toDate(data.lastSpottedFrequency), // ⚠️ likely should be TEXT
      lastSpottedMode:
        typeof data.lastSpottedMode === "string" ? data.lastSpottedMode : null,
      logBookTemplateId:
        typeof data.logBookTemplateId === "string"
          ? data.logBookTemplateId
          : null,
      radio: this.toJSON(data.radio),
      updatedAt: this.toDate(data.updatedAt),
    };
  }
  private mapLogbookContact(data: any, docId: string): Partial<any> {
    const uid = data.uid || data.userId || null;
    const firebase_id = data.firebase_id || docId; // Use data.firebase_id if available, else docId

    // Normalize contact timestamp
    const contactTs =
      data.contactTimeStamp || data.contactTimestamp || data.timestamp;

    return {
      firebase_id: firebase_id,
      uid: uid,
      id: uuidv4(), // nullable in schema

      // Required fields
      adi_imported: this.toBoolean(data.adiImported),
      band: typeof data.band === "string" ? data.band : null,
      call_sign_search_index: this.toStringArray(data.callSignSearchIndex),
      contact_time_stamp: this.toDate(contactTs),
      contest_id: typeof data.contestId === "string" ? data.contestId : null,
      country: typeof data.country === "string" ? data.country : null,
      date: this.toDate(data.date),
      distance: this.toNumber(data.distance),
      frequency: typeof data.frequency === "string" ? data.frequency : null,
      grid: typeof data.grid === "string" ? data.grid : null,
      log_book: this.toJSON(data.logBook),
      log_book_id: typeof data.logBookId === "string" ? data.logBookId : null,
      my_call_sign:
        typeof data.myCallSign === "string" ? data.myCallSign : null,
      my_city: typeof data.myCity === "string" ? data.myCity : null,
      my_coordinates: this.toJSON(data.myCoordinates),
      my_country: typeof data.myCountry === "string" ? data.myCountry : null,
      my_flag_code:
        typeof data.myFlagCode === "string" ? data.myFlagCode : null,
      my_name: typeof data.myName === "string" ? data.myName : null,
      my_profile_pic:
        typeof data.myProfilePic === "string" ? data.myProfilePic : null,
      my_state: typeof data.myState === "string" ? data.myState : null,
      my_state_long_name:
        typeof data.myStateLongName === "string" ? data.myStateLongName : null,
      notes: typeof data.notes === "string" ? data.notes : null,
      power: typeof data.power === "string" ? data.power : null,
      profile_call_sign:
        typeof data.profileCallSign === "string" ? data.profileCallSign : null,
      rst_r_c_v_d: typeof data.rstRCVD === "string" ? data.rstRCVD : null, // Or use toNumber if numeric
      rst_sent: typeof data.rstSent === "string" ? data.rstSent : null,
      state: typeof data.state === "string" ? data.state : null,
      state_long_name:
        typeof data.stateLongName === "string" ? data.stateLongName : null,
      tags: this.toStringArray(data.tags),
      their_callsign:
        typeof data.theirCallsign === "string" ? data.theirCallsign : null,
      their_coordinates: this.toJSON(data.theirCoordinates),
      their_country:
        typeof data.theirCountry === "string" ? data.theirCountry : null,
      their_name: typeof data.theirName === "string" ? data.theirName : null,
      their_state: typeof data.theirState === "string" ? data.theirState : null,
      time: typeof data.time === "string" ? data.time : null,
      timestamp: this.toDate(data.timestamp),
      updated_at: this.toDate(data.updatedAt),
      user_grid: typeof data.userGrid === "string" ? data.userGrid : null,
      user_mode: typeof data.userMode === "string" ? data.userMode : null,

      // Optional fields
      my_antenna: typeof data.myAntenna === "string" ? data.myAntenna : null,
      my_radio: typeof data.myRadio === "string" ? data.myRadio : null,
      name_search_index: this.toStringArray(data.nameSearchIndex),
      operator: typeof data.operator === "string" ? data.operator : null,
      qth: typeof data.qth === "string" ? data.qth : null,
      their_city: typeof data.theirCity === "string" ? data.theirCity : null,
      their_park: typeof data.theirPark === "string" ? data.theirPark : null,
      user_qth: typeof data.userQth === "string" ? data.userQth : null,
      active: this.toBoolean(data.active),
      activities: this.toStringArray(data.activities),
      activities_data: this.toJSON(data.activitiesData),
      activities_references: this.toStringArray(data.activitiesReferences),
      adi_error: this.toBoolean(data.adiError),
      adi_file_name:
        typeof data.adiFileName === "string" ? data.adiFileName : null,
      contact_string:
        typeof data.contactString === "string" ? data.contactString : null,
      error_message:
        typeof data.errorMessage === "string" ? data.errorMessage : null,
      has_validation_errors: this.toBoolean(data.hasValidationErrors),
      my_activity_references: this.toStringArray(data.myActivityReferences),
      my_park: this.toDate(data.myPark), // ⚠️ schema says TIMESTAMP – likely should be TEXT
      primary_activity:
        typeof data.primaryActivity === "string" ? data.primaryActivity : null,
      raw_data: this.toJSON(data.rawData),
      their_activities: this.toStringArray(data.theirActivities),
      their_activity_references: this.toStringArray(
        data.theirActivityReferences
      ),
      validation_errors: this.toJSON(data.validationErrors),
      lotw_imported_on:
        typeof data.lotwImportedOn === "string" ? data.lotwImportedOn : null,
      lotw_uploaded_on:
        typeof data.lotwUploadedOn === "string" ? data.lotwUploadedOn : null,
      qrz_imported_on:
        typeof data.qrzImportedOn === "string" ? data.qrzImportedOn : null,
      qrz_uploaded_on:
        typeof data.qrzUploadedOn === "string" ? data.qrzUploadedOn : null,
      duplicate: this.toBoolean(data.duplicate),
      contest_points: this.toNumber(data.contestPoints),
      continent: typeof data.continent === "string" ? data.continent : null,
      country_code:
        typeof data.countryCode === "string" ? data.countryCode : null,
      cw: this.toNumber(data.cw),
      digital: this.toNumber(data.digital),
      dxcc_number: this.toNumber(data.dxccNumber),
      exchange_one:
        typeof data.exchangeOne === "string" ? data.exchangeOne : null,
      exchange_two:
        typeof data.exchangeTwo === "string" ? data.exchangeTwo : null,
      flag_code: typeof data.flagCode === "string" ? data.flagCode : null,
      is_w_f_d_contact: this.toBoolean(data.isWFDContact),
      item_index: this.toNumber(data.itemIndex),
      their_call_sign:
        typeof data.theirCallSign === "string" ? data.theirCallSign : null,
      voice: this.toNumber(data.voice),
      app_version: typeof data.appVersion === "string" ? data.appVersion : null,
      contest_name:
        typeof data.contestName === "string" ? data.contestName : null,
      created_at: this.toNumber(data.createdAt), // Stored as BIGINT (Unix timestamp?)
      exchange_four:
        typeof data.exchangeFour === "string" ? data.exchangeFour : null,
      exchange_three:
        typeof data.exchangeThree === "string" ? data.exchangeThree : null,
      my_antenna_id:
        typeof data.myAntennaId === "string" ? data.myAntennaId : null,
      my_name_search_index: this.toStringArray(data.myNameSearchIndex),
      my_radio_id: typeof data.myRadioId === "string" ? data.myRadioId : null,
      my_saved_location_id:
        typeof data.mySavedLocationId === "string"
          ? data.mySavedLocationId
          : null,
      their_address:
        typeof data.theirAddress === "string" ? data.theirAddress : null,
      their_profile_pic:
        typeof data.theirProfilePic === "string" ? data.theirProfilePic : null,
    };
  }

  private async syncCollection<T>(
    collectionName: string,
    model: any,
    mapper: (data: any, docId: string) => T,
    orderByField = "timestamp",
    limitCount = MAX_FETCH
  ): Promise<{ fetchedTotal: number; insertedTotal: number }> {
    const collRef = collection(this.db, collectionName);
    let fetchedTotal = 0;
    let insertedTotal = 0;
    let lastDoc: any = null;

    while (fetchedTotal < limitCount) {
      const remaining = limitCount - fetchedTotal;
      const currentLimit = Math.min(PAGE_SIZE, remaining);

      let q = query(
        collRef,
        orderBy(orderByField, "desc"),
        limit(currentLimit)
      );
      if (lastDoc) {
        q = query(
          collRef,
          orderBy(orderByField, "desc"),
          startAfter(lastDoc),
          limit(currentLimit)
        );
      }

      let snapshot;
      try {
        snapshot = await getDocs(q);
      } catch (err) {
        console.error(`Failed to query ${collectionName}:`, err);
        break;
      }

      if (snapshot.empty) break;

      const seenKeys = new Map<string, T>(); // Deduplication map

      for (const doc of snapshot.docs) {
        try {
          const mapped = mapper(doc.data(), doc.id);

          const fid = (mapped as any).firebase_id;
          const uid = (mapped as any).uid;

          if (!fid || !uid) {
            console.warn(
              `Skipping ${collectionName}/${doc.id}: missing firebase_id or uid`
            );
            continue;
          }

          const key = `${fid}||${uid}`;
          seenKeys.set(key, mapped); // overwrite duplicates
        } catch (err) {
          console.warn(`Failed to map ${collectionName}/${doc.id}`, err);
        }
      }

      const records = Array.from(seenKeys.values());

      if (records.length === 0) {
        lastDoc = snapshot.docs[snapshot.docs.length - 1];
        continue;
      }

      fetchedTotal += records.length;

      try {
        await model.bulkCreate(records, {
          updateOnDuplicate: Object.keys(model.rawAttributes),
          validate: false,
          ignoreDuplicates: false,
        });
        insertedTotal += records.length;
      } catch (err) {
        console.error(`Bulk insert failed for ${collectionName}:`, err);
        insertedTotal -= records.length;

        for (const record of records) {
          try {
            await model.upsert(record, { validate: false });
            insertedTotal++;
          } catch (e) {}
        }
      }

      lastDoc = snapshot.docs[snapshot.docs.length - 1];
      if (snapshot.size < currentLimit) break;
    }

    return { fetchedTotal, insertedTotal };
  }

  async syncAll(limitCount = MAX_FETCH) {
    console.time("Full Sync");

    try {
      const [usersRes, logsRes, contactsRes] = await Promise.all([
        this.syncCollection(
          "UserProfile",
          UserProfile,
          this.mapUserProfile.bind(this),
          "timestamp",
          limitCount
        ),
        this.syncCollection(
          "LogBook",
          LogBook,
          this.mapLogBook.bind(this),
          "timestamp",
          limitCount
        ),
        this.syncCollection(
          "LogBookContact",
          LogbookContacts,
          this.mapLogbookContact.bind(this),
          "timestamp",
          limitCount
        ),
      ]);

      console.timeEnd("Full Sync");

      return {
        usersFetched: usersRes.fetchedTotal,
        usersInserted: usersRes.insertedTotal,
        logsFetched: logsRes.fetchedTotal,
        logsInserted: logsRes.insertedTotal,
        contactsFetched: contactsRes.fetchedTotal,
        contactsInserted: contactsRes.insertedTotal,
      };
    } catch (err) {
      console.error("Sync failed:", err);
      throw err;
    }
  }
}

export default new SyncService();
