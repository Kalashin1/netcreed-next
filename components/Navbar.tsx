import { NextComponentType } from "next";
import Link from 'next/link'

const links = [
  {
    text: 'Home',
    route: '/'
  },
  {
    text: 'Post',
    route: '/post'
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

const Navbar: NextComponentType = () => {
  return (
    <nav className="topnav navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <div className="container">
        <a className="navbar-brand" href="./index.html"><strong>Mundana</strong></a>
        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarColor02">
          <ul className="navbar-nav mr-auto d-flex align-items-center">
            {links.map((link, index) => (
              <li className="nav-item" key={index}>
                <div className="nav-link">
                  <Link href={link.route} style={{ textDecoration: 'none'}}>
                    {link.text}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <ul className="navbar-nav ml-auto d-flex align-items-center">
            <li className="nav-item highlight">
              <div className="nav-link">
                <Link href="/login">Login</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;