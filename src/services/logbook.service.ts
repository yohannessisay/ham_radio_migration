import {
  getFirestore,
  collection,
  getDocs,
  limit,
  query,
  orderBy,
} from "firebase/firestore";
import FirebaseService from "./firebase.service.js";
import { LogBook } from "../models/logbook.model.js";

class LogBookService {
  private db = getFirestore(FirebaseService.getInstance());

  async fetchLatestFromFirestore(limitCount = 10000) {
    const logCollection = collection(this.db, "LogBook");
    const logQuery = query(
      logCollection,
      orderBy("timestamp", "desc"),
      limit(limitCount)
    );
    const snapshot = await getDocs(logQuery);

    if (snapshot.empty) {
      console.log("⚠️ No logbook entries found in Firestore");
      return [];
    }

    const logs = snapshot.docs.map((doc) => ({
      firebase_id: doc.id,
      user_firebase_id: (doc.data() as any).uid || (doc.data() as any).userId || null,
      name: (doc.data() as any).name || null,
      myAntenna: (doc.data() as any).myAntenna || null,
      myRadio: (doc.data() as any).myRadio || null,
      contactCount: (doc.data() as any).contactCount || 0,
      coordinates: (doc.data() as any).coordinates || null,
      timestamp: (doc.data() as any).timestamp?.seconds
        ? new Date((doc.data() as any).timestamp.seconds * 1000)
        : null,
      lastContactTimestamp: (doc.data() as any).lastContactTimestamp?.seconds
        ? new Date((doc.data() as any).lastContactTimestamp.seconds * 1000)
        : null,
    }));

    return logs;
  }

  async insertIntoPostgres(logs: any[]) {
    if (!logs.length) return 0;

    const inserted = await LogBook.bulkCreate(logs, {
      ignoreDuplicates: true,
    });
    return inserted.length;
  }

  async syncFromFirestore(limitCount = 10000) {
    const logs = await this.fetchLatestFromFirestore(limitCount);
    const insertedCount = await this.insertIntoPostgres(logs);
    return { totalFetched: logs.length, insertedCount };
  }
}

export default new LogBookService();
