import React, { useState, useEffect } from "react";

// Assets
// import avatar from "../assets/images/avatar.jfif";
export default function Nav(props) {
  const { name, url } = props;
  return (
    <header>
      <nav>
        <h2>Edvora</h2>
        <div className='user'>
          <p>{name}</p>
          <div className='avatar'>
            <img src={url} alt={name} />
          </div>
        </div>
      </nav>
    </header>
  );
}
