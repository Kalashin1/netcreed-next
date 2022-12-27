import { Article, ARTICLE_ENGAGEMENT, Author, User, USER_ENGAGEMENT_ACTION_TYPE, UserProfile as _UserProfile } from "../types";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase-settings";
import { Dispatch, SetStateAction } from "react";
import { getCurrentUser, getUser, getProfile, hasUserEngagedWithUser } from "../helper";

export const getUserEngagements = async (userId: string) => {
  const docRef = await doc(db, 'users', userId);
  const document = await getDoc(docRef);
  const userDoc = (await document.data()) as User;
  return {
    id: document.id,
    followers: userDoc.followers ?? [],
    following: userDoc.following ?? [],
  };
};

export const hasUserEngaged = async (
  userId: string,
  articleId: string,
  type: ARTICLE_ENGAGEMENT
) => {
  const userRef = await getDoc(doc(db, 'users', userId));
  if (userRef.exists()) {
    const user = { ...userRef.data(), id: userRef.id } as User;
    const articleRef = await getDoc(doc(db, 'users', articleId));
    if (articleRef.exists()) {
      const article = { ...articleRef.data(), id: articleRef.id } as Article;
      const engagements = article[type];
      if (engagements.find((u) => u.id === user.id)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const toogleEngagement = async (
  userId: string,
  articleId: string,
  type: ARTICLE_ENGAGEMENT,
  updateEngagement: Dispatch<SetStateAction<boolean>>,
  updateEngagementList: Dispatch<SetStateAction<number>>
) => {
  // get a user Ref
  const userRef = await getDoc(doc(db, 'users', userId));
  if (userRef.exists()) {
    const user = { ...userRef.data(), id: userRef.id } as User;
    const articleRef = await getDoc(doc(db, 'articles', articleId));
    if (articleRef.data()) {
      const article = { ...articleRef.data(), id: articleRef.id } as Article;
      const engagements = article[type];
      let updateObj: Record<string, any> = {};
      if (engagements.find((u) => u.id === user.id)) {
        const updatedEngagements = engagements.filter((u) => u.id !== user.id);
        updateObj[type] = updatedEngagements;
        await updateDoc(doc(db, 'articles', article.id), { ...updateObj });
        updateEngagement(false);
        updateEngagementList(updatedEngagements.length);
        console.log(updatedEngagements);
      } else {
        const updatedEngagements = [
          ...engagements,
          {
            username: user.username,
            phone: user.phone,
            name: user.name,
            twitter: user.twitter,
            github: user.github,
            coverPhoto: user.profilePhoto,
            email: user.email,
            id: user.id,
          },
        ];
        updateObj[type] = updatedEngagements;
        await updateDoc(doc(db, 'articles', article.id), { ...updateObj });
        updateEngagement(true);
        updateEngagementList(updatedEngagements.length);
        console.log(updatedEngagements);
      }
    }
  }
};

export const engageUser = async (
  userId: string,
  engagementAction: USER_ENGAGEMENT_ACTION_TYPE
): Promise<[number | null, Author[][], string | null]> => {
  try {
    const [currentUser] = await getCurrentUser();
    if (!currentUser) throw Error('Please login');
    const user = await getUser(currentUser);
    const otherUser = (await getProfile(userId)) as Partial<_UserProfile>;
    const userEngagements = await getUserEngagements(user.id);
    const otherUserEngagements = await getUserEngagements(userId);
    if (engagementAction === 'FOLLOW') {
      // * hasUserEngaged
      if (
        (await hasUserEngagedWithUser(userEngagements, userId, 'FOLLOWING')) &&
        (await hasUserEngagedWithUser(
          otherUserEngagements,
          currentUser.uid,
          'FOLLOWERS'
        ))
      ) {
        // * Has to work on this
        const updatedEngagements = userEngagements['following'].filter(
          (en) => en.id !== userId
        );
        const otherUserUpdatedEngagements = otherUserEngagements[
          'followers'
        ].filter((en) => en.id !== currentUser.uid);
        await updateDoc(doc(db, 'users', user.id), {
          following: [...updatedEngagements],
        });
        await updateDoc(doc(db, 'users', otherUser.id!), {
          followers: [...otherUserUpdatedEngagements],
        });
        const res = [updatedEngagements, otherUserUpdatedEngagements];
        return [-1, [updatedEngagements, otherUserUpdatedEngagements], null];
      } else {
        delete otherUser.bio, otherUser.creator;
        userEngagements['following'].push(otherUser as Author);
        otherUserEngagements['followers'].push(user);
        await updateDoc(doc(db, 'users', user.id), {
          following: [...userEngagements['following']],
        });
        await updateDoc(doc(db, 'users', otherUser.id!), {
          followers: [...otherUserEngagements['followers']],
        });
        return [
          1,
          [userEngagements['following'], otherUserEngagements['followers']],
          null,
        ];
      }
    } else {
      // * account for blocked users
      return [null, [], 'has not accounted for blocked users'];
    }
  } catch (error: any) {
    return [null, [], error.message];
  }
};