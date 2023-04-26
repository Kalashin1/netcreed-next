import SignupForm from '../components/Signup-Form';
import { NextPage } from 'next';
import Layout from './Layout';
import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import { useContext } from 'react';
import { ThemeContext } from './_app';

const Register: NextPage = () => {
  let theme: string = useContext(ThemeContext).theme;
  return (
    //@ts-ignore
    <Layout>
       <Head>
        <meta name="title" content="Netcreed, Software Development" />
        <meta
          name="description"
          content="Software development platform for FullStack Development, JavaScript Development and Mobile Development"
        />
        <meta
          name="keywords"
          content="javascript, nodejs, typescript, react, coding, software, backend, frontend, svelte, angular"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="author" content="Kinanee Samson" />
        <title>Netcreed</title>
        {/* TWITTER CARD */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@netcreed" />
        <meta name="twitter:creator" content="@netcreed" />
        <meta name="twitter:title" content="Netcreed" />
        <meta
          name="twitter:description"
          content="Software development platform for FullStack Development, JavaScript Development and Mobile Development."
        />
        <meta
          name="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/foodkal-01.appspot.com/o/Untitled%20design.png?alt=media&token=6fc883b7-cb07-4c96-9633-16a0ccea05fe"
        />
        {/* Open Graph  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blog.thenetcreed.com/" />
        <meta property="og:title" content="Netcreed" />
        <meta
          property="og:description"
          content="Software development platform for FullStack Development, JavaScript Development and Mobile Development."
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://firebasestorage.googleapis.com/v0/b/foodkal-01.appspot.com/o/Untitled%20design.png?alt=media&token=6fc883b7-cb07-4c96-9633-16a0ccea05fe"
        />
      </Head>
      <div className="text-center my-4">
        <h3 className={`my-4 text-${theme === 'dark' ? 'light' : 'dark'}`}>
          Create a new account
        </h3>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Container>
              <SignupForm creator={true} />
            </Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Register;
