import { randomBytes } from "crypto";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../Firebase-settings";
import { getArticleRef, getCurrentUser, getUser } from "../helper";
import { CreateCommentPayload, Comment } from "../types";

export const createComment = async ({
  articleId,
  body,
  owner,
  parentCommentId,
}: CreateCommentPayload): Promise<[boolean, string | null]> => {
  try {
    const { articleRef, article } = await getArticleRef(articleId);
    let comments = article.comments ? article.comments : [];
    console.log(parentCommentId);
    const comment: Comment = parentCommentId
      ? {
          article: articleRef,
          articleId,
          body,
          likes: [],
          createdAt: new Date().getTime(),
          owner,
          ownerId: owner.id,
          id: randomBytes(4).toString('hex'),
          parentComment: parentCommentId,
        }
      : {
          article: articleRef,
          articleId,
          body,
          likes: [],
          createdAt: new Date().getTime(),
          owner,
          ownerId: owner.id,
          id: randomBytes(4).toString('hex'),
        };
    comments.push(comment);
    await updateDoc(doc(db, 'articles', articleId), {
      comments: [...comments],
    });
    return [true, null];
  } catch (error: any) {
    return [false, error.message];
  }
};

export const updateComment = async (
  articleId: string,
  id: string,
  body: string
): Promise<[boolean, string | null]> => {
  try {
    const { article } = await getArticleRef(articleId);
    const comments = article.comments;
    const comment = comments.find((c) => c.id === id);
    if (comment) {
      comment.body = body;
      comment.updatedAt = new Date().getTime();
      const filteredComments = comments.filter((c) => c.id !== comment.id);
      filteredComments.push(comment);
      await updateDoc(doc(db, 'articles', articleId), {
        comments: filteredComments,
      });
      return [true, null];
    }
    return [false, 'comment not found'];
  } catch (error: any) {
    console.log(error);
    return [false, error.message];
  }
};

export const deleteComment = async (articleId: string, id: string) => {
  try {
    const { article } = await getArticleRef(articleId);
    const comments = article.comments;
    const comment = comments.find((c) => c.id === id);
    if (comment) {
      const filteredComments = comments.filter((c) => c.id !== comment.id);
      await updateDoc(doc(db, 'articles', articleId), {
        comments: filteredComments,
      });
      return [true, null];
    }
    return [false, 'comment not found'];
  } catch (error: any) {
    console.log(error);
    return [false, error.message];
  }
};

export const engageComment = async (
  articleId: string,
  commentId: string
): Promise<[number | null, number | null, string | null]> => {
  console.log(commentId);
  try {
    const { article } = await getArticleRef(articleId);
    const [user, err] = await getCurrentUser();
    if (err) throw Error(err);
    const userProfile = await getUser(user!);
    const comment = await article.comments?.find((c) => c.id === commentId);
    if (!comment) throw Error('no comment with that id');
    const engagements = comment.likes;
    const userEngagement = engagements.find((e) => e.id === userProfile.id);
    if (userEngagement) {
      const updatedEngagements = engagements.filter(
        (e) => e.id !== userProfile.id
      );
      comment.likes = updatedEngagements;
      const articleComments = article.comments.filter(
        (c) => c.id !== comment.id
      );
      articleComments.push(comment);
      await updateDoc(doc(db, 'articles', articleId), {
        comments: articleComments,
      });
      return [-1, updatedEngagements.length, null];
    } else {
      engagements.push(userProfile);
      comment.likes = engagements;
      const articleComments = article.comments.filter(
        (c) => c.id !== comment.id
      );
      articleComments.push(comment);
      await updateDoc(doc(db, 'articles', articleId), {
        comments: articleComments,
      });
      return [1, engagements.length, null];
    }
  } catch (error: any) {
    console.log(error);
    return [null, null, error.message];
  }
};
