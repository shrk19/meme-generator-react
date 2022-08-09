import React from 'react'

export default function MemeCard(props) {
  return (
    <div className='card'>
        <img className='image' src={props.url} alt="meme" />
        <h3>{props.caption}</h3>
    </div>
  )
}
