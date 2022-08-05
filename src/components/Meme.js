
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Meme() {


  // to store the array of meme data
  const [allMemeData, setAllMemeData] = useState({});
  // random meme index
  const [memeIndex, setMemeIndex] = useState(0);

  // meme template image
  // const [formData, setFormData] = useState({
  //   // topText: "", 
  //   // bottomText: "", 
  //   memeImage: "https://i.imgflip.com/39t1o.jpg"
  // });

  // meme caption 
  const [captions, setCaptions] = useState([]);

  const navigate = useNavigate();
  
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemeData(data.data.memes))
  }, [])

  React.useEffect(()=>{
    if(allMemeData.length){
      setCaptions(Array(allMemeData[memeIndex].box_count).fill(""));
    }
  }, [memeIndex, allMemeData]);

  React.useEffect(()=>{
    console.log(captions)
  }, [captions])

  function getImage(){
    setMemeIndex(Math.floor(Math.random()*100));
    // let random = Math.floor(Math.random()*100);
          // let randomImage = allMemeData[memeIndex].url;
          // setFormData(()=>{
          //   return {
          //     // ...prevMeme, 
          //     memeImage: randomImage
          //   }
          // });
  }
  function updateCaption(event, index){
    const text = event.target.value || "";
    setCaptions(
      captions.map((c,i)=>{
        if(index === i){
          return text;
        }else{
          return c;
        }
      })
    )
  }
  function generateMeme(){
    const currentMeme = allMemeData[memeIndex];
    const formData = new FormData();
    
    formData.append("username", process.env.REACT_APP_MEME_API_USERNAME);
    formData.append("password", process.env.REACT_APP_MEME_API_PASSWORD);
    formData.append("template_id", currentMeme.id);
    captions.forEach((c, index)=> formData.append(`boxes[${index}][text]`, c));

    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => 
      {navigate(`/generated?url=${data.data.url}`);
      console.log(data);
    });

  }
  return (
      <div className='form'>
        
        <button 
          className="button" 
          type='submit'
          onClick={getImage}>
            Get a new meme image 🖼
        </button>

        {/* caption input fields */}
        {
          captions.map((c, index)=>
            <input key={index} type="text" className="form-input" placeholder={`text ${index+1}`} onChange={(event)=>updateCaption(event, index)}/>
          )
        }

        {/* meme image */}
        {allMemeData.length ? <img className='meme-image' src={allMemeData[memeIndex].url} alt="meme-template" /> : <></>}

        <button 
          className="yellow" 
          type='submit'
          onClick={generateMeme}>
            Generate Meme
        </button>
    </div>
    
   
    
  )
}




  

  
