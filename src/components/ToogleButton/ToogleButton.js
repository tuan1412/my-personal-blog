import React from 'react';
import { Navbar } from 'react-bootstrap';
import './style/ToogleButton.scss';

function ToogleButton() {
  return (
    <Navbar.Toggle aria-controls="responsive-navbar-nav">
      <span className="icon-bar" />
      <span className="icon-bar" />
      <span className="icon-bar" />
    </Navbar.Toggle>
  );
}

export default ToogleButton;
