/* eslint-disable react/no-unescaped-entities */
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Script from 'next/script';
import Router from 'next/router';

export const ThemeContext = React.createContext<{ theme: string, setTheme?: Dispatch<SetStateAction<string>>}>({
  theme: 'dark',
});


function CustomApp({ Component, pageProps, router }: AppProps) {

  const [theme, setTheme] = useState('light')

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
      <ThemeContext.Provider value={{theme, setTheme}}>
        <Component {...pageProps} />
      </ThemeContext.Provider>
    </>
  );
}


export default CustomApp;