// MapComponent.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Импорт цветных маркеров
import redIconUrl from '../../public/icons/marker-icon-red.png';
import greenIconUrl from '../../public/icons/marker-icon-green.png';
import blueIconUrl from '../../public/icons/marker-icon-blue.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';


// Настройка иконки маркера
const redIcon = L.icon({
  iconUrl: redIconUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const greenIcon = L.icon({
  iconUrl: greenIconUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = L.icon({
  iconUrl: blueIconUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


const WorldMap = ({width, height, isCreate}) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {

        if (!isCreate) {
          // Отображаем все поинты, если это главная страница
          const response = await axios.get('/api/coordinates');
          setMarkers(response.data);
        }


      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    };
    fetchMarkers();
  }, []);

  const handleClick = async (event) => {
    if (!isCreate) return null;

    const { lat, lng } = event.latlng;

    setMarkers([ { id: 1, category: 1, latitude: lat, longitude: lng } ]);
  };

  const MapClickHandler = () => {
    useMapEvents({ click: handleClick });

    return null;
  };

  return (
    <MapContainer center={[52.28775, 104.2809 ]} zoom={13} style={{ height: height, width: width, marginBottom: 20 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      {markers.map(marker => {
        let icon = marker.category == 1 ? redIcon : (marker.category == 2 ? greenIcon : blueIcon);

        return (
          <Marker key={marker.id} position={ [marker.latitude, marker.longitude] } icon={icon}>
            {!isCreate && (
              <Popup>
                
                <p>Название: {marker.name}</p>
                <p>Категория: {marker.category}</p>
                <p>Описание: {marker.description}</p>
              
              </Popup>
            )}

          </Marker>
        );
      })}
      <MapClickHandler />
    </MapContainer>
  );
};

export default WorldMap;