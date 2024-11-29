import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/PinPage.css'

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

        const payload = {
          pinContent: {
            text: pinContextText,
            photo: pinContextPhoto,
            video: pinContextVideo,
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
      <h1>{pinName}</h1>
      {content ? content.map(content => (
        <div>
          <p>{content.text}</p>
          {content.img ?
            <img className="imgContent" src={content.img} alt="User submitted image" />
            : null
          }
          <br />
          {content.video ?
            <img className="videoContent" src={content.video} alt="User submitted video" />
            : null
          }
        </div>   
      )) : null}
      {addContent ? 
        <>
        <button className="addContentButton" onClick={() => {setAddContent(!addContent)}}>Cancel</button>
        </>
        :
        <button className="addContentButton" onClick={() => {setAddContent(!addContent)}}>Add Content</button>
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