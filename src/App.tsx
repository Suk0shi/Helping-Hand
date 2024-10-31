import './App.css'
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import DraggableMarker from "./components/DraggableMarker";

interface CenterMapProps {
  position: [number, number];
  onCentered: () => void;
}

interface Marker {
  geocode: [number, number];
  popUp: string;
}

function App() {
  const [placeMarker, setPlaceMarker] = useState<boolean>(false);
  const [mapCentered, setMapCentered] = useState<boolean>(false);
  const [position, setPosition] = useState<[number, number] | null>(null)
  const [markers, setMarkers] = useState<Marker[] | null>(null)

  //Fake markers for now
  // const markers = [
  //   {
  //     geocode: [48.86, 2.3522],
  //     popUp: "Marker popup!!!"
  //   },
  //   {
  //     geocode: [48.9, 2.3522],
  //     popUp: "Marker popup!!!"
  //   },
  //   {
  //     geocode: [48.96, 2.3522],
  //     popUp: "Marker popup!!!"
  //   },
  // ]

  useEffect(() => {
    fetch('http://localhost:3000/pins', {
      mode: 'cors', 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((data) => { 
        setMarkers(data.pins.map(pin => (
          {
            geocode: [pin.lat, pin.lng],
            popUp: pin.pinname
          }
        )))
      })
  }, [ ]);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/10186/10186991.png",
    //iconUrl: require("filepath"),
    iconSize: [38, 38]
  })

  const createCustomClusterIcon = (cluster: { getChildCount: () => unknown; }) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    })
  }
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  function CenterMap({ position, onCentered }: CenterMapProps) {
    const map = useMap();
  
    useEffect(() => {
      if (position) {
        map.flyTo(position, map.getZoom());
        onCentered();
      }
    }, [map, position, onCentered]);
  
    return null;
  }

  return (
    <>
      {/* coordinates then zoom */}
      <MapContainer center={position || [51.505, -0.09]} zoom={13} >
        <TileLayer 
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers ? markers.map(marker => (
            <Marker position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          )) : null }
        </MarkerClusterGroup>
        {placeMarker ? <DraggableMarker /> : null}
        {placeMarker ? 
        <>
        <button className="addPin" onClick={() => {setPlaceMarker(!placeMarker)}}>Cancel</button>
        </>
        :
        <button className="addPin" onClick={() => {setPlaceMarker(!placeMarker)}}>Add Pin</button>
        }
        {position && !mapCentered && (<CenterMap position={position} onCentered={() => setMapCentered(true)}/>)}
      </MapContainer>
    </>
  )
}

export default App
