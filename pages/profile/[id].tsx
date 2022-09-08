import { NextPage } from "next";
import Layout from "../Layout";
import ViewUserProfile from "../../components/Profile-view";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { User } from "../../types";
import { db, auth } from "../../Firebase-settings";
import { getDoc, doc } from 'firebase/firestore'

const UserProfile: NextPage = () => {
  const router = useRouter();
  const { id } = router.query

  let _user: Partial<User> = {};

  const [user, setUser] = useState(_user)

  useEffect(() => {
    const getUserProfile = async (id: string) => {
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", id);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const $user = { ...docSnap.data(), id: docSnap.id }
          console.log($user)
          setUser($user)
        } else {
          alert("No user with that id");
          router.push('/')
        }
      } else {
        router.push('/')
      }
    }

    getUserProfile(id as string)
  }, [id])

  return (
    // @ts-ignore
    <Layout>
      { user && (<ViewUserProfile user={user} />)}
    </Layout>
  )
}

export default UserProfile;