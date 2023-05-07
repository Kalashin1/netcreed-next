import Head from 'next/head';
import Script from 'next/script';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FC } from 'react';
import AppStyle from './app.module.css';
import SignInModal from '../components/Signin-Modal';
import { ThemeContext } from './_app';
import "./app.module.css"
type Props = {
  children: React.ReactNode;
};
//@ts-ignore
const Layout: FC<Props> = function ({ children }) {
  let _theme: string = useContext(ThemeContext).theme;
  const [show, setShow] = useState(false);


  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      setTimeout(() => {
        handleShow();
      }, 3000)
    }
  }, [])



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Head>
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
      </Head>
      <div className={`bg-${_theme == 'dark' ? 'dark' : 'light'}`}>
        <Navbar />
        <div style={{ padding: '4rem .5rem', minHeight: '72vh' }}>
          <SignInModal show={show} handleClose={handleClose} />
          {children}
        </div>
        <Footer />
      </div>

      <Script
        defer
        src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js"
        integrity="sha512-6PM0qYu5KExuNcKt5bURAoT6KCThUmHRewN3zUFNaoI6Di7XJPTMoT6K0nsagZKk2OB4L7E3q1uQKHNHd4stIQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      ></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.0/js/bootstrap.min.js"
        integrity="sha512-8Y8eGK92dzouwpROIppwr+0kPauu0qqtnzZZNEF8Pat5tuRNJxJXCkbQfJ0HlUG3y1HB3z18CSKmUo7i2zcPpg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      ></Script>
    </>
  );
};

export default Layout;
