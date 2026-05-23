import { 
  collection, doc, getDocs, getDoc, 
  addDoc, updateDoc, deleteDoc, 
  query, where, orderBy, limit,
  Timestamp, serverTimestamp
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { BlogPost } from '../types';

const BLOG_COLLECTION = 'blogs';

export const blogService = {
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const q = query(collection(db, BLOG_COLLECTION), orderBy('publishedAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        publishedAt: doc.data().publishedAt?.toDate() || new Date(),
      })) as BlogPost[];
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, BLOG_COLLECTION);
      return [];
    }
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const q = query(collection(db, BLOG_COLLECTION), where('slug', '==', slug), limit(1));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      const data = snapshot.docs[0].data();
      return {
        id: snapshot.docs[0].id,
        ...data,
        publishedAt: data.publishedAt?.toDate() || new Date(),
      } as BlogPost;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, BLOG_COLLECTION);
      return null;
    }
  },

  async createPost(post: Omit<BlogPost, 'id' | 'publishedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, BLOG_COLLECTION), {
        ...post,
        publishedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, BLOG_COLLECTION);
      throw error;
    }
  },

  async updatePost(id: string, post: Partial<BlogPost>): Promise<void> {
    try {
      const docRef = doc(db, BLOG_COLLECTION, id);
      await updateDoc(docRef, {
        ...post,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${BLOG_COLLECTION}/${id}`);
      throw error;
    }
  },

  async deletePost(id: string): Promise<void> {
    try {
      const docRef = doc(db, BLOG_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${BLOG_COLLECTION}/${id}`);
      throw error;
    }
  }
};
