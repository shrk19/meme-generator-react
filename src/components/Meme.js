
import React, {useState} from 'react'

export default function Meme() {

  const [allMemeData, setAllMemeData] = useState({});
  
  const [formData, setFormData] = useState({
    topText: "", 
    bottomText: "", 
    memeImage: "https://i.imgflip.com/39t1o.jpg"
  });
  
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemeData(data.data.memes))
  }, [])

  function getImage(){
    let random = Math.floor(Math.random()*100);
    let randomImage = allMemeData[random].url;
    setFormData((prevMeme)=>{
      return {
        ...prevMeme, 
        memeImage: randomImage
      }
    });

  }

  function handleChange(event){
    const {name, value} = event.target
    setFormData(prevMeme=>{
        return {
            ...prevMeme, 
            [name] : value
        }
    })
  }

  return (
    <main>
      <div className='form'>
        <input 
          type="text" 
          placeholder='top text'
          className='form-input'
          name='topText'
          value={formData.topText}
          onChange={handleChange}
        />
        <input 
          type="text"   
          placeholder='bottom text'
          className='form-input'
          name='bottomText'
          value={formData.bottomText}
          onChange={handleChange}
        />
        <button 
          className="form-button" 
          type='submit'
          onClick={getImage}>
            Get a new meme image 🖼
        </button>

        <div className="meme">
          <img className='meme-image' src={formData.memeImage} alt="meme-template" />
          <h2 className="meme--text top">{formData.topText}</h2>
          <h2 className="meme--text bottom">{formData.bottomText}</h2>
        </div> 
    </div>
    </main>
    
  )
}




  

  
