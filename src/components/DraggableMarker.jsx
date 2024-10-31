import { useCallback, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const center = {
    lat: 51.505,
    lng: -0.09,
  }

function DraggableMarker() {
    const map = useMap();
    const [position, setPosition] = useState(map.getCenter())
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )

    function savePin() {
        console.log(position.lat);
        console.log(position.lng);
        //('test1', 48.86, 2.3522)

        const payload = {pin: `'test5', ${position.lat}, ${position.lng}`}

        console.log(JSON.stringify(payload))

        fetch(`http://localhost:3000/pins/new`, {
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
          console.log("Comment Sent");
          
        })
        .catch((err) => {
          console.log(err.toString());
        });
    }
  
    return (
      <>
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            <Popup minWidth={90}>
            {map.getCenter()}
            </Popup>
        </Marker>
        <button className="placePin" onClick={() => {savePin()}}>Place Pin</button>
      </>
    )
}

export default DraggableMarker;