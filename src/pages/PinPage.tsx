import { useState } from "react";
import { useParams } from "react-router-dom";

function PinPage() {
    const [pinContextText, setpinContextText] = useState('');
    const [pinContextPhoto, setpinContextPhoto] = useState('');
    const [pinContextVideo, setpinContextVideo] = useState('');
    const [addContent, setAddContent] = useState(false);
    const { id } = useParams();

    function addPinContent() {

        const payload = {
          pinContent: {
            text: pinContextText,
            photo: pinContextPhoto,
            video: pinContextVideo,
          },
        }

        console.log(JSON.stringify(payload))

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
            <h1>You made it</h1>
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