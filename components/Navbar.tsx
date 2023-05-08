/* eslint-disable react/no-children-prop */
import Link from 'next/link';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { auth, db } from '../Firebase-settings';
import { getDoc, doc } from '@firebase/firestore';
import { signOut, User as AuthUser } from '@firebase/auth';
import { FC, useEffect, useContext, useState } from 'react';
import { User } from '../types';
import { Menu, DarkModeIcon, LightModeIcon } from './svg/icons';
import { ThemeContext, AuthContext } from '../pages/_app';
import { useRouter } from 'next/router';

const links = [
  {
    text: 'Home',
    route: '/',
  },
  {
    text: 'About',
    route: '/about',
  },
  {
    text: 'Category',
    route: '/category',
  },
  {
    text: 'Create Account',
    route: '/signup',
  },
] as const;

const NavbarComponent: FC = () => {
  const router = useRouter();
  const { theme, updateTheme } = useContext(ThemeContext);
  const {user} = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);

  const logout = async (expanded: boolean) => {
    setExpanded(!expanded);
    try {
      await signOut(auth);
      localStorage.removeItem('userId');
      router.push('/login');
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <Navbar
      bg={theme === 'dark' ? 'dark' : 'light'}
      expanded={expanded}
      expand="lg"
      fixed="top"
      collapseOnSelect={true}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand href="/">
          <Image src="/logo.png" width={50} height={60} alt="Netcreed" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          children={
            <span>
              <Menu />
            </span>
          }
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item
              onClick={() => setExpanded(!expanded)}
              style={{ margin: '.5rem 1rem' }}
            >
              <Link href="/">Home</Link>
            </Nav.Item>
            <Nav.Item
              onClick={() => setExpanded(!expanded)}
              style={{ margin: '.5rem 1rem' }}
            >
              <Link href="/about">About</Link>
            </Nav.Item>

            {user ? (
              <Nav.Item
                onClick={() => setExpanded(!expanded)}
                style={{ margin: '.5rem 1rem' }}
              >
                <Link href="/user/profile">Profile</Link>
              </Nav.Item>
            ) : (
              <Nav.Item
                onClick={() => setExpanded(!expanded)}
                style={{ margin: '.5rem 1rem' }}
              >
                <Link href="/register">Create Account</Link>
              </Nav.Item>)
            }

            <Nav.Item style={{ margin: '.5rem 1rem' }}>
              <Link href="/course">Courses</Link>
            </Nav.Item>

            {user ? (
              <Nav.Item
                onClick={() => {
                  logout(expanded);
                }}
                style={{
                  margin: '.5rem 1rem',
                  color: '#03a87c',
                  cursor: 'pointer',
                }}
              >
                <span>Logout</span>
              </Nav.Item>
            ) : (
              <Nav.Item
                onClick={() => setExpanded(!expanded)}
                style={{ margin: '.5rem 1rem' }}
              >
                <Link href="/login">Login</Link>
              </Nav.Item>
            )}
            {theme === 'light' ? (
              <Nav.Item
                onClick={() => setExpanded(!expanded)}
                style={{ margin: '.5rem 1rem' }}
              >
                <span
                  // @ts-ignore
                  onClick={(e) => updateTheme('dark')}
                  className="text-dark"
                  style={{ cursor: 'pointer', fontWeight: 'bold' }}
                >
                  <DarkModeIcon />
                </span>
              </Nav.Item>
            ) : (
              <Nav.Item
                onClick={() => setExpanded(!expanded)}
                style={{ margin: '.5rem 1rem' }}
              >
                <span
                  // @ts-ignore
                  onClick={(e) => updateTheme('light')}
                  className="text-light"
                  style={{ cursor: 'pointer', fontWeight: 'bold' }}
                >
                  <LightModeIcon />
                </span>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
