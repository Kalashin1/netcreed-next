import { randomBytes } from "crypto";
import { updateDoc, doc, addDoc, collection, where, orderBy } from "@firebase/firestore";
import { db, auth } from "./Firebase-settings";
import { User as AuthUser } from "@firebase/auth";
import { storage } from "./Firebase-settings"
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { Dispatch, FormEvent, MutableRefObject, SetStateAction } from "react";
import { Article, ARTICLE_STATUS, CourseSchema, User, Author, LessonSchema, CourseRef } from "./types";
import { NextRouter } from "next/router";
import { getDoc, getDocs, limit, query, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, signInWithPopup, updateProfile } from "firebase/auth";


export const uploadImage = async (file: HTMLInputElement, folder: string) => {
  const extension = file.files![0].name.split('.')[1];

  const key = randomBytes(16).toString('hex');
  const name = `${key}.${extension}`;
  localStorage.setItem('name', name);


  const storageRef = ref(storage)
  const articleImagesRef = ref(storageRef, `${folder}/${name}`);

  const metadata = {
    contentType: 'image/jpeg',
  };

  const res = await uploadBytes(articleImagesRef, file.files![0], metadata);

  const imageUrl = await getDownloadURL(articleImagesRef);

  return imageUrl;
}


export const tags = [
  { label: "JavaScript", value: "js" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "NodeJS", value: "node" },
  { label: "TypeScript", value: "ts" },
  { label: "Python", value: "python" },
  { label: "React", value: "react" },
  { label: 'React Native', value: 'react-native' },
  { label: "Angular", value: "angular" },
  { label: "Go", value: "go" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Solidity", value: "solidity" },
  { label: "AWS", value: 'aws' },
  { label: "GCP", value: "gcp" },
  { label: "MongoDB", value: "mongodb" },
  { label: "SQL", value: "sql" },
  { label: "Dart", value: 'dart' },
  { label: "Flutter", value: 'flutter' }
];

export const categories = [
  { label: 'Programming', value: 'coding' },
  { label: 'UI/UX', value: 'ui/ux' },
  { label: 'Digital Marketing', value: 'digiMarketing' },
  { label: 'Game Development', value: 'gameDev' }
]

interface EditArticlePayload {
  title: string;
  body: string;
  selectedTags: typeof tags;
  selectedCategory: string;
}

export const updateArticle = async (
  e: FormEvent<HTMLFormElement>,
  staus: ARTICLE_STATUS,
  setShowSpinner: Dispatch<SetStateAction<boolean>>,
  coverPhoto: MutableRefObject<null | HTMLInputElement>,
  article: Article,
  { title, body, selectedTags, selectedCategory }: EditArticlePayload,
  router: NextRouter
) => {
  setShowSpinner(true)
  try {
    e.preventDefault();

    let imageUrl;

    const photo = coverPhoto.current!

    if (photo.files![0]) {
      imageUrl = await uploadImage(photo, 'articles');
    } else {
      imageUrl = article.coverPhoto;
    }

    console.log(imageUrl);

    const articleUpdate: Partial<Article> = {
      title: title,
      body: body,
      description: body.slice(0, 200),
      updatedAt: new Date().getTime(),
      coverPhoto: imageUrl,
      tags: selectedTags,
      category: selectedCategory,
      status: staus!,
    }
    await updateDoc(doc(db, 'articles', article.id), articleUpdate);
    setShowSpinner(true)
    alert('Article Edited');
    router.push('/post-dashboard');
  } catch (error) {
    setShowSpinner(true)
    console.log(error)
  }
}

export const getUser = async (user: AuthUser) => {
  const uid = user.uid;
  const docRef = doc(db, 'users', uid);
  const document = await getDoc(docRef);
  const userDoc = await document.data() as User;
  return {
    username: userDoc.username,
    phone: userDoc.phone,
    name: userDoc.name,
    twitter: userDoc.twitter,
    github: userDoc.github,
    coverPhoto: userDoc.profilePhoto,
    email: userDoc.email,
    id: document.id,
  }
}


export const createCourseFormHandler = async (
  e: FormEvent<HTMLFormElement>,
  form: HTMLFormElement,
  setShowSpinner: Dispatch<SetStateAction<boolean>>,
  router: NextRouter
) => {
  setShowSpinner(true)
  try {
    e.preventDefault();



    const { title, coverPhoto, description } = form;

    const imageUrl = await uploadImage(coverPhoto as HTMLInputElement, 'courses');

    console.log(imageUrl);

    const course: CourseSchema = {
      lessons: [],
      createdAt: new Date().getTime(),
      description: description.value,
      photoUrl: imageUrl,
      status: "SAVED",
      // @ts-ignore
      title: title.value,
    }


    await addDoc(collection(db, 'courses'), course);
    setShowSpinner(true)
    alert('Course created');
    router.push('/courses');
  } catch (error) {
    setShowSpinner(true)
    console.log(error)
  }
}

export const createArticleHandler = async (
  e: FormEvent<HTMLFormElement>,
  form: HTMLFormElement, staus: ARTICLE_STATUS,
  setShowSpinner: Dispatch<SetStateAction<boolean>>,
  selectedTags: typeof tags,
  selectedCategory: string,
  router: NextRouter,
) => {
  setShowSpinner(true)
  try {
    e.preventDefault();

    let author: Author;

    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw Error('You are not loggged in yet');
    } else {
      author = await getUser(currentUser);
    }
    const { articleName, coverPhoto, body } = form;

    const imageUrl = await uploadImage(coverPhoto as HTMLInputElement, 'articles');

    console.log(imageUrl);

    const article: Partial<Article> = {
      title: articleName.value,
      body: body.value,
      description: body.value.slice(0, 200),
      createdAt: new Date().getTime(),
      coverPhoto: imageUrl,
      readingTimeInMins: (body.value.length / 2000),
      author,
      likes: [],
      saves: [],
      tags: selectedTags,
      category: selectedCategory,
      status: staus!,
      views: [],
    }
    await addDoc(collection(db, 'articles'), article);
    setShowSpinner(true)
    alert('Article created');
    router.push('/post-dashboard');
  } catch (error) {
    setShowSpinner(true)
    console.log(error)
  }
}


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
    localStorage.setItem('userToken', token!)
    localStorage.setItem('userId', user.uid);
    console.log(credential, token, user)
    setShowSpinner2(false);
    await setDoc(doc(db, 'users', user.uid), {
      name: user.displayName,
      email: user.email,
      articles: [],
      createdAt: new Date().getTime(),
      creator: creator
    })
    alert('Your account has been created successfully');
    router.push('/profile');
  } catch (error) {
    setShowSpinner2(false);
    console.log(error);
  }

}

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
      confirmPassword: confirmPassword.value
    };

    if (userPayload.password !== userPayload.confirmPassword) {
      throw Error('Passwords does not match')
    }

    const { user } = await createUserWithEmailAndPassword(auth, userPayload.email, userPayload.password);
    await sendEmailVerification(auth.currentUser as AuthUser);
    localStorage.setItem('userId', user.uid);
    console.log(user)
    await setDoc(doc(db, 'users', user.uid), {
      name: userPayload.name,
      email: userPayload.email,
      articles: [],
      createdAt: new Date().getTime(),
      creator: creator
    })
    await updateProfile(auth.currentUser!, {
      displayName: userPayload.name,
    })
    setShowSpinner(false);
    alert('Your account has been created successfully');
    router.push('/profile');
  } catch (error: any) {
    setShowSpinner(false);
    console.log(error)
  }
}

export const getCourse = async (id: string): Promise<[CourseSchema | null, any | null]> => {
  try {
    const docRef = doc(db, 'courses', id);
    const docRes = await getDoc(docRef);
    const course = ({ ...docRes.data(), id: docRes.id }) as CourseSchema;
    return [course, null]
  } catch (error: any) {
    return [null, error.message]
  }
}

export const getCourses = async (): Promise<[CourseSchema[]|null, string|null]> => {
  try {
    const _q = query(collection(db, 'courses'), orderBy('createdAt', 'desc'))
    const _docRes = await getDocs(_q);
    const courses = _docRes.docs.map(doc => ({ ...doc.data(), id: doc.id })) as CourseSchema[];
    return [courses, null]
  } catch (error: any) {
    return [null, error.message]
  }
}

export const getArticle = async (id: string) => {
  const ref = doc(db, 'articles', id);
  const docRes = await getDoc(ref);
  const article = ({ ...docRes.data(), id: docRes.id }) as Article;

  const _q = query(collection(db, 'articles'), where('tags', 'array-contains-any', article.tags), orderBy('createdAt', 'desc'), limit(7))
  const _docRes = await getDocs(_q);
  const articles = _docRes.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Article[];
  return { article, articles };
}

export const getArticles = async () => {
  const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
  const docRes = await getDocs(q);
  const articles = docRes.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Article[];
  console.log(articles[0].tags)
  const sQ = query(collection(db, 'articles'), where('tags', 'array-contains-any', articles[0].tags), orderBy('createdAt', 'desc'), limit(10))
  const sQDocRef = await getDocs(sQ);
  const secArticles = sQDocRef.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Article[];
  return { articles, secArticles }
}

export const createLessonFormHandler = async (
  form: HTMLFormElement,
  setShowSpinner: Dispatch<SetStateAction<boolean>>,
  _course: string,
  router: NextRouter
) => {
  const { title, content, description } = form;
  try {
    const [course, err] = await getCourse(_course);
    if (err) {
      return [null, err];
    }

    const coursePayload: CourseRef = {
      title: course!.title,
      description: course!.description,
      id: course!.id,
      url: course!.url,
      slug: course!.slug
    };

    const lesson: LessonSchema = {
      course: coursePayload,
      status: "SAVED",
      description: description.value,
      // @ts-ignore
      title: title.value,
      courseContent: content.value!,
      createdAt: new Date().getTime()
    }


    const doc = await addDoc(collection(db, 'lessons'), lesson);
    return [doc, null];
  } catch (error: any) {
    return [null, error.message]
  }
}

export const getUserWithoutID = async (): Promise<[{ articles: Article[], user: User } | null, string | null]> => {
  let userId: string
  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('userId')!
  }
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(db, 'users', userId!)
    // console.log(userId)
    let userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const user = userDoc.data() as User
      const q = query(collection(db, 'articles'), where("author.id", "==", userDoc.id), limit(3), orderBy('createdAt', 'desc'))
      const docs = await getDocs(q);
      const articles = docs.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Article[];

      user.id = userDoc.id;
      return [{ articles, user }, null]
    }
  }
  return [null, 'Please login'];
}


async function getFile() {
  const pickerOpts = {
    types: [
      {
        description: 'Images',
        accept: {
          'image/*': ['.png', '.gif', '.jpeg', '.jpg']
        }
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false
  };
  try {
    // @ts-ignore
    const fileHandle = await window.showOpenFilePicker(pickerOpts);
    const file = await fileHandle[0].getFile()
    return [file, null]
  } catch (error: any) {
    return [null, error.message];
  }

}


export const uploadProfilePhoto = async (userId: string, fileInput: HTMLInputElement): Promise<[string | null, string | null]> => {
  //@ts-ignore
  let [file, err] = await getFile();
  console.log(file, err)

  if (err) {
    // @ts-ignore
    const input = fileInput

    input.click();
    input.onchange = async (e: Event) => {
      try {
        file = input.files![0]
        // console.log(file)
        const url = await uploadImage(file, 'profile-photo');

        await updateDoc(doc(db, 'users', userId), { profilePhoto: url });
        await updateProfile(auth.currentUser!, { photoURL: url });
        return ["Profile Photo updated successfully!", null];
      } catch (error: any) {
        console.log(error.message)
        return [null, error.message];
      }
    };
  }

  const url = await uploadImage(file, 'profile-photo');
  await updateDoc(doc(db, 'users', userId), { profilePhoto: url });
  await updateProfile(auth.currentUser!, { photoURL: url });
  return ["Profile Photo updated successfully!", null];
}

export  const _updateProfile = async ( form: HTMLFormElement, userId: string) => {
  try {
    const { username, phone, headline, github, twitter, linkedin, reddit } = form;
    const payload = {
      username: username.value,
      phone: phone.value,
      headline: headline.value,
      github: github.value,
      twitter: twitter.value,
      linkedin: linkedin.value,
      reddit: reddit.value,
    }
    await updateDoc(doc(db, 'users', userId), payload);
    return['Your profile has been updated successfully!', null];
  } catch (error: any) {
    return [null, error.message];
  }
}

export const updateBio = async (form: HTMLFormElement, userId: string) => {
  try {
    const { bio } = form;
    const payload = {
      bio: bio.value,
    }
    await updateDoc(doc(db, 'users', userId), payload);
    return ['Your bio has been updated successfully!', null]
  } catch (error: any) {
    return [null, error.message]
  }
}