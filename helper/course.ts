import { doc, getDoc, query, collection, orderBy, getDocs, updateDoc, addDoc } from "firebase/firestore";
import { NextRouter } from "next/router";
import { FormEvent, Dispatch, SetStateAction } from "react";
import slugify from "slugify";
import { db } from "../Firebase-settings";
import { uploadImage } from "../helper";
import { CourseSchema } from "../types";

export const createCourseFormHandler = async (
  e: FormEvent<HTMLFormElement>,
  form: HTMLFormElement,
  setShowSpinner: Dispatch<SetStateAction<boolean>>,
  router: NextRouter
) => {
  setShowSpinner(true);
  try {
    e.preventDefault();

    const { title, coverPhoto, description } = form;

    const imageUrl = await uploadImage(
      coverPhoto as HTMLInputElement,
      'courses'
    );

    console.log(imageUrl);

    const course: CourseSchema = {
      lessons: [],
      createdAt: new Date().getTime(),
      description: description.value,
      photoUrl: imageUrl,
      status: 'SAVED',
      // @ts-ignore
      title: title.value,
    };

    const slug = slugify(course.title!, {
      lower: true,
    });

    const courseDoc = await addDoc(collection(db, 'courses'), course);
    await updateDoc(doc(db, 'courses', courseDoc.id), {
      url: `course/${courseDoc.id}`,
      slug: `course/${slug}`,
      updatedAt: new Date().getTime(),
    });
    setShowSpinner(true);
    alert('Course created');
    router.push('/courses');
  } catch (error) {
    setShowSpinner(true);
    console.log(error);
  }
};


export const getCourse = async (
  id: string
): Promise<[CourseSchema | null, any | null]> => {
  try {
    const docRef = doc(db, 'courses', id);
    const docRes = await getDoc(docRef);
    const course = { ...docRes.data(), id: docRes.id } as CourseSchema;
    return [course, null];
  } catch (error: any) {
    return [null, error.message];
  }
};

export const getCourses = async (): Promise<
  [CourseSchema[] | null, string | null]
> => {
  try {
    const _q = query(collection(db, 'courses'), orderBy('createdAt', 'desc'));
    const _docRes = await getDocs(_q);
    const courses = _docRes.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as CourseSchema[];
    return [courses, null];
  } catch (error: any) {
    return [null, error.message];
  }
};

export const editCourseFormHandler = async (
  { title, description }: any,
  courseId: string
) => {
  try {
    const slug = slugify(title, {
      lower: true,
    });

    const course: Partial<CourseSchema> = {
      updatedAt: new Date().getTime(),
      description: description,
      title,
      url: `course/${courseId}`,
      slug: `course/${slug}`,
    };

    await updateDoc(doc(db, 'courses', courseId), course);
    return [true, null];
  } catch (error: any) {
    console.log(error);
    return [false, error.message];
  }
};