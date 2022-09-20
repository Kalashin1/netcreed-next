import { NextComponentType } from "next";
import Link from 'next/link'
import Image from "next/image";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { db } from '../Firebase-settings';
import { getDoc, doc } from "@firebase/firestore";
import { useEffect, useState } from 'react';
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

const NavbarComponent: NextComponentType = () => {

  const [user, setUser] = useState({} as User);

  useEffect(() => {
    async function getUser() {
      const userId = localStorage.getItem('userId');
      if (userId){
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
    <Navbar bg="white" expand="lg" fixed="top">
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
            { user.creator && (
              <Nav.Item style={{ margin: '.5rem 1rem' }}>
                <Link href="/signup">Create Account</Link>
              </Nav.Item>
              )
            }
            { user.creator && (
              <Nav.Item style={{ margin: '.5rem 1rem' }}>
                <Link href="/login">Login</Link>
              </Nav.Item>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent;