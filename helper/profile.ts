import { updateProfile, User as AuthUser } from "firebase/auth";
import { updateDoc, doc, collection, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db, auth } from "../Firebase-settings";
import { uploadAsset } from "../helper";
import { Article, Author, User, UserProfile } from "../types";

export const uploadProfilePhoto = async (
  userId: string,
  fileInput: HTMLInputElement
): Promise<[string | null, string | null]> => {
  //@ts-ignore
  let [file, err] = await getFile();
  console.log(file, err);

  if (err) {
    // @ts-ignore
    const input = fileInput;

    input.click();
    input.onchange = async (e: Event) => {
      try {
        file = input.files![0];
        // console.log(file)
        const url = await uploadAsset(input, 'profile-photo');

        await updateDoc(doc(db, 'users', userId), { profilePhoto: url });
        await updateProfile(auth.currentUser!, { photoURL: url });
        return ['Profile Photo updated successfully!', null];
      } catch (error: any) {
        console.log(error.message);
        return [null, error.message];
      }
    };
  }

  const url = await uploadAsset(file, 'profile-photo');
  await updateDoc(doc(db, 'users', userId), { profilePhoto: url });
  await updateProfile(auth.currentUser!, { photoURL: url });
  return ['Profile Photo updated successfully!', null];
};

export const _updateProfile = async (form: HTMLFormElement, userId: string) => {
  try {
    const { username, phone, headline, github, twitter, linkedin, dev } = form;
    const payload = {
      username: username.value,
      phone: phone.value,
      headline: headline.value,
      github: github.value,
      twitter: twitter.value,
      linkedin: linkedin.value,
      dev: dev.value,
    };
    await updateDoc(doc(db, 'users', userId), payload);
    return ['Your profile has been updated successfully!', null];
  } catch (error: any) {
    return [null, error.message];
  }
};

export const updateBio = async (form: HTMLFormElement, userId: string) => {
  try {
    const { bio } = form;
    const payload = {
      bio: bio.value,
    };
    await updateDoc(doc(db, 'users', userId), payload);
    return ['Your bio has been updated successfully!', null];
  } catch (error: any) {
    return [null, error.message];
  }
};

type GetUserWithoutIdPayload = [
  {
    articles: Article[];
    user: User;
  } | null,
  string | null
];

export const getUserWithoutID = async (): Promise<GetUserWithoutIdPayload> => {
  let userId: string;
  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('userId')!;
  }
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(db, 'users', userId!);
    // console.log(userId)
    let userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const user = userDoc.data() as User;
      const q = query(
        collection(db, 'articles'),
        where('author.id', '==', userDoc.id),
        limit(3),
        orderBy('createdAt', 'desc')
      );
      const docs = await getDocs(q);
      const articles = docs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Article[];

      user.id = userDoc.id;
      return [{ articles, user }, null];
    }
  }
  return [null, 'Please login'];
};

export const getUser = async (user: AuthUser): Promise<Author> => {
  const uid = user.uid;
  const docRef = doc(db, 'users', uid);
  const document = await getDoc(docRef);
  const userDoc = (await document.data()) as User;
  return {
    username: userDoc.username,
    phone: userDoc.phone,
    name: userDoc.name,
    twitter: userDoc.twitter,
    github: userDoc.github,
    coverPhoto: userDoc.profilePhoto,
    email: userDoc.email,
    id: document.id,
  };
};

export const getProfile = async (userId: string): Promise<UserProfile> => {
  const docRef = await doc(db, 'users', userId);
  const document = await getDoc(docRef);
  const userDoc = (await document.data()) as User;
  return {
    username: userDoc.username ?? '',
    phone: userDoc.phone ?? '',
    name: userDoc.name ?? '' ,
    twitter: userDoc.twitter ?? '',
    github: userDoc.github ?? '',
    coverPhoto: userDoc.profilePhoto ?? '',
    email: userDoc.email ?? '',
    id: document.id ?? '',
    bio: userDoc.bio ?? '',
    creator: userDoc.creator ?? '',
  };
};