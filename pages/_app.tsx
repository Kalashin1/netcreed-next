/* eslint-disable react/no-unescaped-entities */
import { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { getCurrentUser, getUserWithoutID } from '../helper';
import { User } from '../types'
import { User as AuthUser } from '@firebase/auth';
import Script from 'next/script';

let _theme: string;
let _textColor: string;
let _user: AuthUser | User | null ;

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

export const AuthContext = React.createContext<{
  user: AuthUser | User | null,
  getLoggedInUser?: (userId?: string) => Promise<AuthUser | User | null>
}>({
  user: null
})

function CustomApp({ Component, pageProps, router }: AppProps) {
  const [theme, setTheme] = useState(_theme);
  const [textColor, setTextColor] = useState(_textColor);
  const [user, setUser] = useState<typeof _user | null>(_user);

  const updateTheme = (theme: string) => {
    setTheme(theme);
    const __textColor = theme === 'dark' ? 'light' : 'dark';
    setTextColor(__textColor);
    localStorage.setItem('theme', theme);
    localStorage.setItem('textColor', __textColor);
  };

  const getLoggedInUser = async (userId?: string) => {
    const [loggedInUser, err] = await getCurrentUser();
    
    if (loggedInUser) {
      setUser(loggedInUser)
      return loggedInUser
    }
    console.log('userError', err);
    
    if (err || userId) {
      console.log(userId)
      const [existingUser, _err] = await getUserWithoutID(userId);

      if (_err) {
        setUser(null);
        return null;
      }

      if (existingUser) {
        setUser(existingUser.user)
        return existingUser.user;
      }
    }
    return null;
  }

  useEffect(() => {
    getLoggedInUser(localStorage.getItem('userId')!).then((_user) => {
      setUser(_user)
    })
  }, [])

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
          <AuthContext.Provider value={{ user, getLoggedInUser }}>
            <Component {...pageProps} />
          </AuthContext.Provider>
        </ThemeContext.Provider>
      </SSRProvider>
    </>
  );
}

export default CustomApp;
