import React from 'react';
import Menu from '@components/Menu';
import Logo from '@components/Logo';
import Slogan from '@components/Slogan';

function Header() {
  return (
    <header className="header_area">
      <Menu />
      <div className="logo_part">
        <Logo />
        <Slogan />
      </div>
    </header>
  );
}

export default Header;
