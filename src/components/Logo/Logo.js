import React from 'react';
import { Link } from 'gatsby';

import './style/Logo.scss';

function Logo() {
  return (
    <Link className="logo" to="/" aria-label="Logo">
      I&apos;m Tuan;
    </Link>
  );
}

export default Logo;
