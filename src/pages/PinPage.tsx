import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/PinPage.css'
import Header from "../components/Header";
import addLogo from '../assets/addLogo.png';
import cancelLogo from '../assets/cancelLogo.png';

function PinPage() {
    const [pinContextText, setpinContextText] = useState('');
    const [pinContextPhoto, setpinContextPhoto] = useState('');
    const [pinContextVideo, setpinContextVideo] = useState('');
    const [pinName, setPinName] = useState(null);
    const [content, setContent] = useState(null);
    const [addContent, setAddContent] = useState(false);
    const { id } = useParams();

    useEffect(() => {
      fetch(`http://localhost:3000/pins/${id}`, {
        mode: 'cors', 
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((data) => { 
          console.log(data);
          setPinName(data.pinName[0].pinname);
          setContent(data.content.map(content => (
            {
              text: content.textcontent,
              img: content.imgcontent,
              video: content.videocontent
            }
          )))
        })
    }, [ addContent ]);

    function addPinContent() {
        let video = null;  
        if (pinContextVideo) {
          const urlObj = new URL(pinContextVideo);  
          video = urlObj.searchParams.get('v');
        }  
        const payload = {
          pinContent: {
            text: pinContextText,
            photo: pinContextPhoto,
            video: video,
          },
        }

        fetch(`http://localhost:3000/pins/${id}`, {
          method: 'Post', 
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }
  
          return response.json();
        })
        .then(() => {
          console.log("Content Added");
          
        })
        .catch((err) => {
          console.log(err.toString());
        });

        setAddContent(false);
    }

  return (
    <>
      <Header/>
      <h1 className="pinTitle">{pinName}</h1>
      <div className="contentColumns">
        {content ? content.map((content, index) => (
          <div key={index} className="contentColumnItem">
            {content.text ?
              <p>{content.text}</p>
              : null
            }
            {content.img ?
              <img className="imgContent" src={content.img} alt="User submitted image" />
              : null
            }
            {content.video ?
              <iframe 
                src={`https://www.youtube.com/embed/${content.video}?autoplay=1&mute=1&loop=1&playlist=${content.video}&modestbranding=1&showinfo=0&rel=0`} 
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
              : null
            }
          </div>   
        )) : <p>No content yet. Add something!</p>}
      </div>
      {addContent ? 
        <>
        <img src={cancelLogo} alt="Cancel Adding Content Button" className="addContentButton" onClick={() => {setAddContent(!addContent)}}/>
        </>
        :
        <img src={addLogo} alt="Add Content Button" className="addContentButton" onClick={() => {setAddContent(!addContent)}}/>
      }
      {addContent ? 
        <>
          <label htmlFor="inputPinContextText">Text</label>
          <input className='inputPinContextText' id="inputPinContextText" type="text" value={pinContextText} onChange={(e) => { setpinContextText(e.target.value); } } />
          <label htmlFor="inputPinContextPhoto">Image Link</label>
          <input className='inputPinContextPhoto' id="inputPinContextPhoto" type="text" value={pinContextPhoto} onChange={(e) => { setpinContextPhoto(e.target.value); } } />
          <label htmlFor="inputPinContextVideo">Video Link</label>
          <input className='inputPinContextVideo' id="inputPinContextVideo" type="text" value={pinContextVideo} onChange={(e) => { setpinContextVideo(e.target.value); } } />
          <button onClick={() => {addPinContent()}}>Submit</button>
        </>
        :
        null
      }
    </>
  );
}

export default PinPage;