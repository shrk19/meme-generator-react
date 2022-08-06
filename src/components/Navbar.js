import React from 'react'

export default function Navbar(props) {
  return (
        <nav className='navbar'>
            <img className='logo' src="images/trollface.png" alt="logo" />
            <h1>{props.title}</h1>
        </nav>
   
  )
}
