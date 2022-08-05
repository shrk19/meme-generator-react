
import React, {useState} from 'react'

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
    .then(data => console.log(data))

  }

  // function handleChange(event){
  //   const {name, value} = event.target
  //   setFormData(prevMeme=>{
  //       return {
  //           ...prevMeme, 
  //           [name] : value
  //       }
  //   })
  // }

  return (
      <div className='form'>
        {/* <input 
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
        /> */}

        <button 
          className="form-button" 
          type='submit'
          onClick={getImage}>
            Get a new meme image 🖼
        </button>


        {
          captions.map((c, index)=>
            <input key={index} type="text" className="form-input" placeholder={`text ${index+1}`} onChange={(event)=>updateCaption(event, index)}/>
          )
        }

        <button 
          className="form-button" 
          type='submit'
          onClick={generateMeme}>
            Generate Meme
        </button>
        {allMemeData.length ? <img className='meme-image' src={allMemeData[memeIndex].url} alt="meme-template" /> : <></>}
        
        {/* <div className="meme">
          <h2 className="meme--text top">{formData.topText}</h2>
          <h2 className="meme--text bottom">{formData.bottomText}</h2>
          
        </div>  */}
    </div>
    
   
    
  )
}




  

  
