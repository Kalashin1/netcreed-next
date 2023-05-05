import { NextPage } from 'next';
import Layout from '../Layout';
import ViewUserProfile from '../../components/Profile-view';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { User, Article } from '../../types';
import { db, auth } from '../../Firebase-settings';
import {
  getDoc,
  doc,
  getDocs,
  collection,
  where,
  query,
  limit,
  orderBy,
} from 'firebase/firestore';

const UserProfile: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  let _user: Partial<User> = {};
  let _articles: Article[] = [];

  const [user, setUser] = useState(_user);
  const [posts, setPosts] = useState(_articles);

  useEffect(() => {
    const getUserProfile = async (id: string) => {
      const userDocRef = doc(db, 'users', id);

      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const q = query(
          collection(db, 'articles'),
          where('author.id', '==', id),
          limit(5),
          orderBy('createdAt', 'desc')
        );
        const docs = await getDocs(q);
        const articles = docs.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Article[];
        const $user = { ...docSnap.data(), id: docSnap.id };
        console.log($user);
        setUser($user);
        setPosts(articles);
      }
    };

    getUserProfile(id as string);
  }, [id]);

  return (
    // @ts-ignore
    <Layout>{user && <ViewUserProfile user={user} articles={posts} />}</Layout>
  );
};

export default UserProfile;
