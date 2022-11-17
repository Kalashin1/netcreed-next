/* eslint-disable react/no-children-prop */
import Link from 'next/link';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { db } from '../Firebase-settings';
import { getDoc, doc } from '@firebase/firestore';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { User } from '../types';

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

type Props = {
  changeTheme: (theme: string) => void;
  theme: string;
};

const NavbarComponent: FC<Props> = ({ changeTheme, theme }) => {
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    async function getUser() {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const docRef = await getDoc(doc(db, 'users', userId!));
        const user = docRef.data() as User;
        // console.log(user)
        setUser(user);
      } else {
        setUser({} as User);
      }
    }

    getUser();
  }, []);

  return (
    <Navbar bg={theme} expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          <Image src="/logo.png" width={50} height={60} alt="Netcreed" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          children={
            <span>
              <i
                className={`fas fa-bars ${theme === 'dark' ? 'light' : 'dark'}`}
              />
            </span>
          }
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item style={{ margin: '.5rem 1rem' }}>
              <Link href="/">Home</Link>
            </Nav.Item>
            <Nav.Item style={{ margin: '.5rem 1rem' }}>
              <Link href="/about">About</Link>
            </Nav.Item>

            <Nav.Item style={{ margin: '.5rem 1rem' }}>
              <Link href="/user/profile">Profile</Link>
            </Nav.Item>

            {
              //@ts-ignore
              !user && user.creator && (
                <Nav.Item style={{ margin: '.5rem 1rem' }}>
                  <Link href="/signup">Create Account</Link>
                </Nav.Item>
              )
            }

            {
              //@ts-ignore
              !user && user.creator && (
                <Nav.Item style={{ margin: '.5rem 1rem' }}>
                  <Link href="/login">Login</Link>
                </Nav.Item>
              )
            }

            {/* {
              user && user.twitter === "kinanee_samson" &&
              (
                <Nav.Item style={{ margin: '.5rem 1rem' }}>
                  <Link href="/courses">Courses</Link>
                </Nav.Item>
              )
            } */}

            {user && user.creator && (
              <Nav.Item style={{ margin: '.5rem 1rem' }}>
                <Link href="/login">Logout</Link>
              </Nav.Item>
            )}
            <Nav.Item style={{ margin: '.5rem 1rem' }}>
              <span
                onClick={(e) => changeTheme('dark')}
                className="text-dark"
                style={{ cursor: 'pointer', fontWeight: 'bold' }}
              >
                Dark Mode
              </span>
            </Nav.Item>
            <Nav.Item style={{ margin: '.5rem 1rem' }}>
              <span
                onClick={(e) => changeTheme('light')}
                className="text-light"
                style={{ cursor: 'pointer', fontWeight: 'bold' }}
              >
                Light Mode
              </span>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
