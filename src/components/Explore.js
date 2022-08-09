import React, { useEffect, useState } from 'react'
import MemeCard from './MemeCard';

export default function Explore() {

  const [apiReq, setapiReq] = useState({});
  const [memeList, setMemeList] = useState([]);
  const [after, setAfter] = useState("");

  const memeCardsElements = memeList.map((meme)=>{
    return meme.data.post_hint==="image" && 
    <MemeCard 
    key={meme.data.created} 
    url={meme.data.url_overridden_by_dest}
    caption={meme.data.title}
    />
  });

  useEffect(()=>{
    fetch(`https://www.reddit.com/r/memes.json?after=${after}`)
    .then(response => response.json())
    .then(data => { setapiReq(data); setMemeList(data.data.children);})
    .catch(error => { console.log(error)})
  }, [after,apiReq])
  
  function fetchMemes(){
    setAfter(apiReq.data.after)
   //console.log(after);
  }

  return (
    <>
    <div>
    {memeCardsElements? memeCardsElements: <h1>Slow internet connection</h1> }
    </div>
    
    <div className='next-button-div'>
    <button onClick={fetchMemes} className='next-button'>Get new memes</button>
    </div>
    
   
    </>
  )
}
