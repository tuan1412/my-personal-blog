import React from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Navbar,
  Container,
  Nav,
} from 'react-bootstrap';
import {
  faFacebookF,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import ToogleButton from '@components/ToogleButton/ToogleButton';
import Logo from '@components/Logo';
import useSiteMetadata from '@hooks/useSiteMetadata';

import './style/Menu.scss';

function Header() {
  const { socialLinks } = useSiteMetadata();
  const {
    email,
    facebook,
    github,
  } = socialLinks;

  return (
    <div className="main_menu">
      <Navbar expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
          <ToogleButton />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Item>
                <Link className="nav-link" to="/">Trang chủ</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/categories/chuyen-code">Chuyện code</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/categories/chuyen-linh-tinh">Chuyện linh tinh</Link>
              </Nav.Item>
            </Nav>
            <Nav className="header_social ml-auto">
              <Nav.Link
                href={`${facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="connect-facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </Nav.Link>
              <Nav.Link
                href={`${github}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="connect-github"
              >
                <FontAwesomeIcon icon={faGithub} />
              </Nav.Link>
              <Nav.Link
                href={`mailto:${email}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="connect-email"
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
