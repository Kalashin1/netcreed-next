import { User as AuthUser } from '@firebase/auth';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { NextRouter } from "next/router";
import { Dispatch, SetStateAction, FormEvent } from "react";
import { auth, db } from "../Firebase-settings";

export const signinWithGoogle = async (
  e: any,
  setShowSpinner2: Dispatch<SetStateAction<boolean>>,
  creator: boolean,
  router: NextRouter
) => {
  e.preventDefault();
  setShowSpinner2(true);
  try {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    const user = result.user;
    localStorage.setItem('userToken', token!);
    localStorage.setItem('userId', user.uid);
    console.log(credential, token, user);
    setShowSpinner2(false);
    await setDoc(doc(db, 'users', user.uid), {
      name: user.displayName,
      email: user.email,
      articles: [],
      createdAt: new Date().getTime(),
      creator: creator,
    });
    alert('Your account has been created successfully');
    router.push('/profile');
  } catch (error) {
    setShowSpinner2(false);
    console.log(error);
  }
};

export const createAccount = async (
  e: FormEvent<HTMLFormElement>,
  form: HTMLFormElement,
  setShowSpinner: Dispatch<SetStateAction<boolean>>,
  creator: boolean,
  router: NextRouter
) => {
  e.preventDefault();
  setShowSpinner(true);
  try {
    const { fullName, email, password, confirmPassword } = form;
    const userPayload = {
      name: fullName.value,
      email: email.value.toLowerCase(),
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    if (userPayload.password !== userPayload.confirmPassword) {
      throw Error('Passwords does not match');
    }

    const { user } = await createUserWithEmailAndPassword(
      auth,
      userPayload.email,
      userPayload.password
    );
    await sendEmailVerification(auth.currentUser as AuthUser);
    localStorage.setItem('userId', user.uid);
    console.log(user);
    await setDoc(doc(db, 'users', user.uid), {
      name: userPayload.name,
      email: userPayload.email,
      articles: [],
      createdAt: new Date().getTime(),
      creator: creator,
    });
    await updateProfile(auth.currentUser!, {
      displayName: userPayload.name,
    });
    setShowSpinner(false);
    alert('Your account has been created successfully');
    router.push('/user/profile');
  } catch (error: any) {
    setShowSpinner(false);
    console.log(error);
  }
};

export const getCurrentUser = async (): Promise<
  [AuthUser | null, string | null]
> => {
  try {
    const user = auth.currentUser;
    return [user, null];
  } catch (error: any) {
    return [null, error.message];
  }
}