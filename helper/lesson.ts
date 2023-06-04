import { 
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from "firebase/firestore";
import slugify from "slugify";
import { db } from "../Firebase-settings";
import { getCourse } from "../helper";
import { CourseRef, LessonSchema } from "../types";

export const createLessonFormHandler = async (
  form: HTMLFormElement,
  _course: string
) => {
  const { title, content, description } = form;
  console.log(_course);
  try {
    const [course, err] = await getCourse(_course);
    if (err) {
      return [null, err];
    }

    console.log(course);

    const coursePayload: CourseRef = {
      id: course?.id,
      url: course?.url ? course?.url : '',
      slug: course?.slug ? course?.slug : '',
    };

    const lesson: LessonSchema = {
      course: coursePayload,
      status: 'SAVED',
      description: description.value,
      courseId: course?.id!,
      // @ts-ignore
      title: title.value,
      courseContent: content.value!,
      createdAt: new Date().getTime(),
    };

    const lessonDoc = await addDoc(collection(db, 'lessons'), lesson);
    const slug = slugify(lesson.title, {
      lower: true,
    });
    await updateDoc(doc(db, 'lessons', lessonDoc.id), {
      url: `lessons/${lessonDoc.id}`,
      slug: `lessons/${slug}`,
      updatedAt: new Date().getTime(),
    });
    return [lessonDoc, null];
  } catch (error: any) {
    console.log(error);
    console.log(error);
    return [null, error.message];
  }
};

export const editLessonFormHandler = async (
  { title, description, content }: any,
  _course: string,
  _lesson: string
) => {
  try {
    const [course, err] = await getCourse(_course);
    if (err) {
      return [null, err];
    }

    const coursePayload: CourseRef = {
      id: course!.id,
      url: course!.url ? course?.url : '',
      slug: course!.slug ? course?.slug : '',
    };

    const slug = slugify(title, {
      lower: true,
    });
    const lesson: Partial<LessonSchema> = {
      course: coursePayload,
      status: 'SAVED',
      description: description,
      // @ts-ignore
      title,
      courseContent: content!,
      courseId: coursePayload?.id,
      url: `lessons/${_lesson}`,
      slug: `lessons/${slug}`,
      updatedAt: new Date().getTime(),
    };
    await updateDoc(doc(db, 'lessons', _lesson), lesson);
    return [true, null];
  } catch (error: any) {
    console.log(error);
    return [false, error.message];
  }
};

export const getLessons = async (
  course: string
): Promise<[LessonSchema[] | null, string | null]> => {
  try {
    const _q = query(
      collection(db, 'lessons'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    const _docRes = await getDocs(_q);
    const lessons = _docRes.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as LessonSchema[];
    return [lessons, null];
  } catch (error: any) {
    return [null, error.message];
  }
};

export const getLesson = async (
  id: string
): Promise<[LessonSchema | null, any | null]> => {
  try {
    const docRef = doc(db, 'lessons', id);
    const docRes = await getDoc(docRef);
    const lesson = { ...docRes.data(), id: docRes.id } as LessonSchema;
    return [lesson, null];
  } catch (error: any) {
    return [null, error.message];
  }
};

export const getLessonsByCourseId = async (
  course: string
): Promise<[LessonSchema[] | null, string | null]> => {
  try {
    // console.log(course)
    const _q = query(
      collection(db, 'lessons'),
      where('courseId', '==', course),
      orderBy('createdAt', 'desc')
    );
    const _docRes = await getDocs(_q);
    const lessons = _docRes.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as LessonSchema[];
    console.log(lessons);
    return [lessons, null];
  } catch (error: any) {
    return [null, error.message];
  }
};