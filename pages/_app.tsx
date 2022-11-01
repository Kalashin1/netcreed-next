/* eslint-disable react/no-unescaped-entities */
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';
import Script from 'next/script';
import Router from 'next/router';


function CustomApp({ Component, pageProps, router }: AppProps) {

  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-8JWZ8XRQMV"></Script>
      <Script id="h1">
        {`
          window.dataLayer = window.dataLayer || [];
          {/* @ts-ignore */}
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'G-8JWZ8XRQMV');        
        `}
        
      </Script>
      <Component {...pageProps} />
    </>
  );
}


export default CustomApp;