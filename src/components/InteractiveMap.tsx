import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with Webpack
const customIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface InteractiveMapProps {
  center?: [number, number];
  zoom?: number;
  markerPosition?: [number, number];
  popupContent?: string;
  className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  center = [-1.286389, 36.817223], // Nairobi coordinates
  zoom = 13,
  markerPosition = [-1.286389, 36.817223],
  popupContent = "Alicia Hairline Beauty Salon",
  className = "h-96 w-full rounded-2xl"
}) => {
  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markerPosition} icon={customIcon}>
          <Popup>
            <div className="text-center p-2">
              <h3 className="font-bold text-lg text-gray-900 mb-1">{popupContent}</h3>
              <p className="text-gray-600 text-sm">Nairobi, Kenya</p>
              <p className="text-gray-500 text-xs mt-1">Click for directions</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
