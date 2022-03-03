import React from "react";

// Assets
import avatar from "../assets/images/avatar.jfif";
export default function Nav() {
  return (
    <header>
      <nav>
        <h2>Edvora</h2>
        <div className='user'>
          <p>Donald Abua</p>
          <div className='avatar'>
            <img src={avatar} alt='donald abua' />
          </div>
        </div>
      </nav>
    </header>
  );
}
