import Head from 'next/head'
import Script from 'next/script';
import type { NextPage, NextPageContext } from 'next'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import 'bootstrap/dist/css/bootstrap.min.css';
import { PropsWithChildren } from 'react';

const Layout: NextPage = function ({ children }: any) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="76x76" href="logo.png" />
        <link rel="icon" type="image/png" href="logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no"
          name="viewport"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Source+Sans+Pro:400,600,700"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
          integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
          crossOrigin="anonymous"
        />
        <link href="assets/css/main.css" rel="stylesheet" />

        <link href="assets/css/select2.min.css" rel="stylesheet" />

      </Head>
      <Navbar />
      { children}
      <Footer />
      <Script
          defer
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js"
          integrity="sha512-6PM0qYu5KExuNcKt5bURAoT6KCThUmHRewN3zUFNaoI6Di7XJPTMoT6K0nsagZKk2OB4L7E3q1uQKHNHd4stIQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></Script>
        
    </>
  )
}

export default Layout;