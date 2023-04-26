/* eslint-disable react/no-unescaped-entities */
import { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';
import Script from 'next/script';

let _theme: string;
let _textColor: string;

if (typeof window !== 'undefined') {
  _theme = localStorage.getItem('theme') ?? 'light';
  _textColor = localStorage.getItem('textColor') ?? 'dark'
}

export const ThemeContext = React.createContext<{
  theme: string;
  textColor: string;
  updateTheme?: (theme: string) => void;
}>({
  // @ts-ignore;
  // 'dark',
  theme: 'dark',
  textColor: 'light'
  //localStorage.getItem('theme')
});

function CustomApp({ Component, pageProps, router }: AppProps) {
  const [theme, setTheme] = useState(_theme);
  const [textColor, setTextColor] = useState(_textColor);

  const updateTheme = (theme: string) => {
    setTheme(theme);
    const __textColor = theme === 'dark' ? 'light': 'dark';
    setTextColor(__textColor);
    localStorage.setItem('theme', theme);
    localStorage.setItem('textColor', __textColor);
  };

  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-8JWZ8XRQMV"
      ></Script>
      <Script id="h1">
        {`
          window.dataLayer = window.dataLayer || [];
          {/* @ts-ignore */}
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'G-8JWZ8XRQMV');        
        `}
      </Script>
      {/** @ts-ignore **/}
      <SSRProvider>
        <ThemeContext.Provider value={{ theme, updateTheme, textColor }}>
          <Component {...pageProps} />
        </ThemeContext.Provider>
      </SSRProvider>
    </>
  );
}

export default CustomApp;
