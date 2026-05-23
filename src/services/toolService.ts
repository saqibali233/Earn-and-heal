import { 
  collection, doc, getDocs, getDoc, 
  addDoc, updateDoc, deleteDoc, 
  query, where, orderBy, limit,
  increment, serverTimestamp
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Tool } from '../types';

const TOOLS_COLLECTION = 'tools';
const USAGE_COLLECTION = 'tool_usage';

export const toolService = {
  async getAllTools(): Promise<Tool[]> {
    try {
      const snapshot = await getDocs(collection(db, TOOLS_COLLECTION));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Tool[];
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, TOOLS_COLLECTION);
      return [];
    }
  },

  async logToolUsage(toolId: string) {
    try {
      const day = new Date().toISOString().split('T')[0];
      const docId = `${toolId}_${day}`;
      const docRef = doc(db, USAGE_COLLECTION, docId);
      
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          count: increment(1),
          lastUsed: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, USAGE_COLLECTION), {
          toolId,
          date: day,
          count: 1,
          lastUsed: serverTimestamp()
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, USAGE_COLLECTION);
    }
  }
};
