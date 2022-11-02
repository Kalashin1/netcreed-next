import Link from 'next/link'
import Image from "next/image";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { db } from '../Firebase-settings';
import { getDoc, doc } from "@firebase/firestore";
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { User } from "../types";

const links = [
  {
    text: 'Home',
    route: '/'
  },
  {
    text: 'About',
    route: '/about'
  },
  {
    text: 'Category',
    route: '/category'
  },
  {
    text: 'Create Account',
    route: '/signup'
  }
] as const;

type Props = {
  changeTheme: Dispatch<SetStateAction<string>>;
  theme: string
}

const NavbarComponent: FC<Props> = ({ changeTheme, theme }) => {

  const [user, setUser] = useState({} as User);

  const updateTheme = () => {
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark');
      changeTheme('dark')
    } else if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
      changeTheme('light')
    } else {
      localStorage.setItem('theme', 'dark');
      changeTheme('dark')
    }
  }

  useEffect(() => {
    async function getUser() {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const docRef = await getDoc(doc(db, "users", userId!));
        const user = docRef.data() as User;
        console.log(user)
        setUser(user);
      } else {
        setUser({} as User);
      }
    }

    getUser();
  }, [])

  return (
    <Navbar bg={theme === 'light' ? 'white' : 'dark'} expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          <Image src="/logo.png" width={50} height={60} alt="Netcreed" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item style={{ margin: '.5rem 1rem' }}>
              <Link href="/">Home</Link>
            </Nav.Item>
            <Nav.Item style={{ margin: '.5rem 1rem' }}>
              <Link href="/about">About</Link>
            </Nav.Item>
            {/* <Nav.Item style={{ margin: '0 1rem' }}>
              <Link href="/categories">Categories</Link>
            </Nav.Item> */}
            {user.creator && (
              <Nav.Item style={{ margin: '.5rem 1rem' }}>
                <Link href="/signup">Create Account</Link>
              </Nav.Item>
            )
            }
            {user.creator && (
              <Nav.Item style={{ margin: '.5rem 1rem' }}>
                <Link href="/login">Login</Link>
              </Nav.Item>
            )
            }


            {theme === 'light' && (
              <Nav.Item style={{ margin: '.5rem 1rem' }}>
                <span
                  onClick={e => updateTheme()}
                  style={{ cursor: 'pointer' }}><i className={`fas fa-sun text-dark`} />
                </span>
              </Nav.Item>
            )}

            {theme === 'dark' && (
              <Nav.Item style={{ margin: '.5rem 1rem' }}>
                <span
                  onClick={e => updateTheme()}
                style={{ cursor: 'pointer' }}><i className={`fas fa-moon text-white`} />
              </span>
            </Nav.Item>
              )}
        </Nav>
      </Navbar.Collapse>
    </Container>
    </Navbar >
  )
}

export default NavbarComponent;