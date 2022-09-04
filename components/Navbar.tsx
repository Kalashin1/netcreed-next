import { NextComponentType } from "next";
import Link from 'next/link'
import Image from "next/image";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
  return (
    <Navbar bg="white" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#home">
          <Image src="/logo.png" width={50} height={60} alt="Netcreed" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item style={{ margin: '0 1rem' }}>
              <Link href="/">Home</Link>
            </Nav.Item>
            <Nav.Item style={{ margin: '0 1rem' }}>
              <Link href="/about">About</Link>
            </Nav.Item>
            <Nav.Item style={{ margin: '0 1rem' }}>
              <Link href="/signup">Create Account</Link>
            </Nav.Item>
            <Nav.Item style={{ margin: '0 1rem' }}>
              <Link href="/login">Login</Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent;