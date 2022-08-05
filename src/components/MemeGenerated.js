import React from 'react'
import { useState } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { useClipboard } from 'use-clipboard-copy';

export default function MemeGenerated() {

    const [copied, setCopied] = useState(false);


    const clipboard = useClipboard()
    const navigate = useNavigate();
    const location = useLocation();
    const url = new URLSearchParams(location.search).get("url");


    function goBackToHomePage(){
        navigate("/");
    }
    function copyLink(){
        clipboard.copy(url);
        setCopied(true);
    }

  return (
    <div className='form'>
        {url && <img className='meme-image' src={url} alt="meme" />}
        <button className={copied ? "button yellow":"button"} onClick={copyLink}>{copied ? "Copied to clipboard" : "Copy image link!"}</button>
        <button className="button" onClick={goBackToHomePage}>Make more memes</button>
        
    </div>
  )
}
