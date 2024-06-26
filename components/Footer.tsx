import { NextComponentType } from 'next';
import Image from 'next/image';
import { Container } from 'react-bootstrap';
import { ThemeContext } from '../pages/_app';
import { useContext } from 'react';

const Footer: NextComponentType = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Container className="mt-5">
      <footer className="border-top p-3 text-muted small">
        <div className="row align-items-center justify-content-between">
          <div>
            <span
              className="navbar-brand mr-2"
              style={{ position: 'relative', top: '1rem' }}
            >
              <Image src={theme === 'dark' ? '/logo-dark.png': '/logo.png'} width={50} objectFit="cover" height={60} alt="Netcreed" />
            </span>{' '}
            Copyright &copy;
            {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
