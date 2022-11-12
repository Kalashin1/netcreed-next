/* eslint-disable react/no-unescaped-entities */
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { Dispatch, SetStateAction, useState } from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';
import Script from 'next/script';
import Router from 'next/router';

let _theme: string;

if (typeof window !== 'undefined') {
  _theme = localStorage.getItem('theme')!
}

export const ThemeContext = React.createContext<{ theme: string, updateTheme?: (theme: string) => void}>({
  // @ts-ignore;
  // 'dark',
  theme: 'dark'
  //localStorage.getItem('theme') 
});


function CustomApp({ Component, pageProps, router }: AppProps) {

  const [theme, setTheme] = useState(_theme)

  const updateTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  }

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
      { /** @ts-ignore **/ }
      <SSRProvider>
        <ThemeContext.Provider value={{theme, updateTheme}}>
          <Component {...pageProps} />
        </ThemeContext.Provider>
      </SSRProvider>
    </>
  );
}


export default CustomApp;