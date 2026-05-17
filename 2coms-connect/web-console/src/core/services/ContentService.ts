import { collection, query, getDocs, addDoc, onSnapshot, where, orderBy, limit, setDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { IntranetContent, User } from '../types';
import { MOCK_CONTENT } from '../../api/mockData';

export class ContentService {
  private static collectionName = 'pulse_content';

  // Real-time listener for the dashboard feed
  static subscribeToFeed(user: User | null, callback: (items: IntranetContent[]) => void) {
    const q = user 
      ? query(
          collection(db, this.collectionName), 
          where('department', 'in', ['GLOBAL', user.department])
        )
      : query(collection(db, this.collectionName), where('department', '==', 'GLOBAL'));

    return onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as IntranetContent[];
      // Sort by timestamp desc (client side if not indexed)
      callback(items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    });
  }

  static async getFeed(user: User | null): Promise<IntranetContent[]> {
    const q = user 
      ? query(collection(db, this.collectionName), where('department', 'in', ['GLOBAL', user.department]))
      : query(collection(db, this.collectionName), where('department', '==', 'GLOBAL'));

    const snapshot = await getDocs(q);
    
    // Seed data if empty
    if (snapshot.empty) {
      for (const item of MOCK_CONTENT) {
        await addDoc(collection(db, this.collectionName), item);
      }
      return MOCK_CONTENT;
    }

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as IntranetContent[];
  }

  static async publishContent(item: Partial<IntranetContent>): Promise<void> {
    const newItem = {
      ...item,
      timestamp: new Date().toISOString(),
      likes: 0,
      reactions: ['🚀', '👏']
    };
    await addDoc(collection(db, this.collectionName), newItem);
  }
}
