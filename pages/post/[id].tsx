import Layout from '../Layout';
import PostHeader from '../../components/Post-Header';
import PostContent from '../../components/Post-Content';
import AddComment from '../../components/Comment-Form';
import Comments from '../../components/Comments';
import AlikePost from '../../components/Alike-Post';
import { Comment } from '../../types';
import { NextPage } from 'next';
import Head from 'next/head';
import AppCss from '../app.module.css';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../_app';
import { getArticle, getCurrentUser, getProfile, getArticleBySlug } from '../../helper';

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  console.log(id)
  let { article, articles } = await getArticleBySlug(
    id.includes('post/') ? id : `post/${id}`
  );
  if (!article) {
    let { article, articles } = await (await getArticle(id)).article;
    return {
      props: { article, articles }
    }
  }
  return {
    props: { article, articles },
  };
};

// @ts-ignore
const Post: NextPage = ({ article, articles }) => {
  const theme = useContext(ThemeContext).theme;
  const [userId, setUserId] = useState<string>();
  const [userPhoto, setUserPhoto] = useState('');

  useEffect(() => {
    const setUp = async () => {
      const [currentUser, err] = await getCurrentUser();
      if (currentUser) {
        setUserId(currentUser.uid);
        const userProfile = await getProfile(currentUser.uid);
        setUserPhoto(userProfile.coverPhoto);
      }
    };
    setUp();
  }, []);
  return (
    // @ts-ignore
    <Layout>
      <Head>
        <meta name="title" content="Netcreed, Software Development" />
        <meta
          name="description"
          content="Software development platform for FullStack Development, JavaScript Development and Mobile Development"
        />
        <meta
          name="keywords"
          content={article.tags.map((t: any) => t.value).join(', ')}
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="author" content={article.author.name} />
        {/* TWITTER CARD  */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:site" content="@netcreed" />
        <meta name="twitter:creator" content="@netcreed" />
        <meta name="twitter:description" content={article.description} />
        <meta name="twitter:image" content={article.coverPhoto} />
        {/* Open Graph  */}
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://blog.thenetcreed.com/post/${article.id}`}
        />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta
          property="og:image"
          itemProp="image"
          content={`${article.coverPhoto}`}
        />
      </Head>
      <div className={AppCss.body}>
        {article && <PostHeader article={article} />}
        {article && <PostContent article={article} />}
        <div className="my-4">
          <h3
            className={`text-left mb-4 text-${theme === 'dark' ? 'light' : 'dark'
              }`}
            style={{ marginLeft: '5vw ' }}
          >
            Add Comment
          </h3>
          <AddComment articleId={article?.id} userId={userId ? userId : ''} />
        </div>
        <div className="my-6">

          {article &&
            article.comments &&
            article.comments.length > 0 &&
            article.comments
              .filter((c: Comment) => typeof c.parentComment === 'undefined')
              .map((comment: Comment) => (
                <Comments
                  key={comment.id}
                  parentCommentId={comment.parentComment}
                  commentId={comment.id}
                  articleId={article?.id}
                  body={comment?.body}
                  createdAt={comment.createdAt}
                  owner={comment?.owner}
                  likes={comment.likes.length ? comment.likes.length : 0}
                />
              ))}
        </div>
        <div className="my-4">
          <AlikePost articles={articles.slice(1, articles.length)} />
        </div>
      </div>
    </Layout>
  );
};

export default Post;
