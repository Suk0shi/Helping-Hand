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
        console.log(position);
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