import { addDoc, collection, updateDoc, doc, getDoc, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../Firebase-settings";
import { NOTIFICATION_TYPE, NotificiationSchema } from "../types";

export const createNotification = async (
  userId: string,
  type: NOTIFICATION_TYPE,
  head: string,
  body: string
) => {
  try {
    const notification: NotificiationSchema = {
      body,
      head,
      userId,
      type,
      createdAt: new Date().getTime(),
      isRead: false,
    };
    await addDoc(collection(db, 'notifications'), notification);
    return [true, null];
  } catch (error: any) {
    return [false, error.message];
  }
};

export const markNotificationAsRead = async (id: string) => {
  try {
    await updateDoc(doc(db, 'notifications', id), { isRead: true });
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};

export const getNotification = async (id: string) => {
  try {
    const docRef = doc(db, 'users', id);
    const document = await getDoc(docRef);
    const notification = { ...document.data(), id: document.id };
    return [notification, null];
  } catch (error: any) {
    return [null, error.message];
  }
};

export const getUserNotifications = async (userId: string) => {
  try {
    const _q = query(
      collection(db, 'notifications'),
      orderBy('createdAt', 'desc')
    );
    const _docRes = await getDocs(_q);
    const notifications = _docRes.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as NotificiationSchema[];
    return [notifications, null];
  } catch (error: any) {
    return [null, error.message];
  }
};
