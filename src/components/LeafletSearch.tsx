import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import * as L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';

function LeafletSearch() {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.Geocoder.nominatim();

    const control = L.Control.geocoder({
      geocoder,
      defaultMarkGeocode: false,
    })
      .on('markgeocode', function(e: any) {
        const latlng = e.geocode.center;
        map.setView(latlng, map.getZoom());
        L.marker(latlng).addTo(map)
          .bindPopup(e.geocode.name)
          .openPopup();
      })
      .addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [map]);

  return null;
}

export default LeafletSearch;