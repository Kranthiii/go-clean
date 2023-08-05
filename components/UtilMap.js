import { memo, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";

function LocationMarker({ onMarkerChange, location }) {
  const [position, setPosition] = useState(location || null);
  useMapEvent("click", (e) => {
    onMarkerChange(e.latlng);
    setPosition(e.latlng);
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function UtilMap({ lat = 51.505, long = -0.09, onMarkerChange, markerlatlng }) {
  return (
    <div className="map" style={{ borderRadius: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="border-2 border-dashed border-300"
      >
        <MapContainer
          center={{ lat, lng: long }}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            onMarkerChange={onMarkerChange}
            location={markerlatlng}
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default memo(UtilMap);
