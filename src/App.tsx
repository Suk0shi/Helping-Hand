import './App.css'
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"
import { useCallback, useMemo, useRef, useState } from 'react';
import DraggableMarker from "./components/DraggableMarker";

function App() {
  const [placeMarker, setPlaceMarker] = useState(false);

  //Fake markers for now
  const markers = [
    {
      geocode: [48.86, 2.3522],
      popUp: "Marker popup!!!"
    },
    {
      geocode: [48.9, 2.3522],
      popUp: "Marker popup!!!"
    },
    {
      geocode: [48.96, 2.3522],
      popUp: "Marker popup!!!"
    },
  ]

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/10186/10186991.png",
    //iconUrl: require("filepath"),
    iconSize: [38, 38]
  })

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    })
  }

  
  return (
    <>
      {/* coordinates then zoom */}
      <MapContainer center={[48.8566, 2.3522]} zoom={13} >
        <TileLayer 
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers.map(marker => (
            <Marker position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        {placeMarker ? <DraggableMarker /> : null}
        {placeMarker ? 
        <>
        <button className="addPin" onClick={() => {setPlaceMarker(!placeMarker)}}>Cancel</button>
        </>
        :
        <button className="addPin" onClick={() => {setPlaceMarker(!placeMarker)}}>Add Pin</button>
        }
      </MapContainer>
    </>
  )
}

export default App
