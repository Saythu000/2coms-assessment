import { collection, query, onSnapshot, where, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export class ContentService {
  private static collectionName = 'pulse_content';

  static subscribeToFeed(user: any, callback: (items: any[]) => void) {
    const q = user 
      ? query(
          collection(db, this.collectionName), 
          where('department', 'in', ['GLOBAL', user.department])
        )
      : query(collection(db, this.collectionName), where('department', '==', 'GLOBAL'));

    return onSnapshot(q, async (snapshot) => {
      // Auto-Seed if database is empty (First run fix)
      if (snapshot.empty) {
        console.log("Database empty. Seeding initial data...");
        const initialData = [
          { id: 'v1', type: 'VISION', department: 'GLOBAL', title: 'Management Vision 2026', content: 'AI-first innovation powering future organization.', timestamp: new Date().toISOString() }, 
          { id: 'p1', type: 'PROJECT_WIN', department: 'TECH', title: 'Apollo 11 Launch', content: 'The Tech team smashed the Q2 delivery deadline!', timestamp: new Date().toISOString() }, 
          { id: 'n1', type: 'NEW_JOINEE', department: 'GLOBAL', title: 'Welcome Amit Patel', content: 'Amit joins the 2COMS family as a Senior Designer.', timestamp: new Date().toISOString() }
        ];
        for (const item of initialData) {
          await addDoc(collection(db, this.collectionName), item);
        }
        // snapshot will fire again after addDoc
      } else {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(items.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      }
    });
  }

  static async getFeed(user: any): Promise<any[]> {
    return new Promise((resolve) => {
      const unsub = this.subscribeToFeed(user, (items) => {
        resolve(items);
        unsub();
      });
    });
  }

  static async publishContent(item: any): Promise<void> {
    await addDoc(collection(db, this.collectionName), {
      ...item,
      timestamp: new Date().toISOString(),
      likes: 0,
      reactions: ['🚀']
    });
  }
}
