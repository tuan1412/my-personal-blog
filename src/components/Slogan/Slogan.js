import React from 'react';
import Typewriter from 'typewriter-effect';

import './style/Slogan.scss';

function Slogan() {
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .typeString('eat() -> sleep()')
          .pauseFor(100)
          .deleteChars(7)
          .typeString('code()')
          .start();
      }}
    />
  );
}

export default Slogan;
