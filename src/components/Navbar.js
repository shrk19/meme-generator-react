import React from 'react'

export default function Navbar(props) {
  return (
        <nav className='navbar'>
          <div className='title'>
            <img className='logo' src="images/trollface.png" alt="logo" />
            <h1>{props.title}</h1>
          </div>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/explore">Explore</a>
              </li>
            </ul>
        </nav>
   
  )
}
