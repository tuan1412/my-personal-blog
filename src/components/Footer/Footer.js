import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import useSiteMetadata from '@hooks/useSiteMetadata';

import './style/Footer.scss';

function Footer() {
  const { socialLinks } = useSiteMetadata();
  const {
    email,
    facebook,
    github,
  } = socialLinks;
  const [subEmail, setEmail] = useState('');
  const emailPrefill = email || 'tuan@example.com';
  const urlForm = `https://docs.google.com/forms/d/e/1FAIpQLSeb_EUrOZUWELJQ-JWJHFcHAgp7PUNghahENpX_wNIfR4AVCA/viewform?entry.1923931752=${emailPrefill}`;
  return (
    <footer className="footer_area">
      <Container>
        <Row>
          <Col lg={4} md={6} sm={6}>
            <div className="single_footer_widget">
              <h6 className="footer_title">Về mình</h6>
              <p>Mình là Tuấn. Blog này để mình note lại kiến thức và chia sẻ với mọi người.</p>
            </div>
          </Col>
          <Col lg={4} md={6} sm={6}>
            <div className="single_footer_widget">
              <h6 className="footer_title">Newsletter</h6>
              <p>Đăng kí để nhận thông báo bài viết</p>
              <div className="input-group d-flex flex-row">
                <input
                  type="text"
                  aria-label="email-subscribe"
                  placeholder="tuan@example.com"
                  value={subEmail}
                  onChange={((ev) => setEmail(ev.target.value))}
                />
                <a
                  className="btn sub-btn"
                  href={urlForm}
                  aria-label="subscribe"
                  role="button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLongArrowAltRight} />
                </a>
              </div>
            </div>
          </Col>
          <Col lg={4} md={6} sm={6}>
            <div className="single_footer_widget f_social_wd">
              <h6 className="footer_title">Kết nối với mình</h6>
              <p>Thông tin liên hệ</p>
              <div className="f_social">
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="connect-facebook"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="connect-github"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                  href={`mailto:${email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="connect-email"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
