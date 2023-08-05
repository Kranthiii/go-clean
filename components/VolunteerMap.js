import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const VolunteerMap = ({ data, center }) => {
  const [Hover, setHover] = useState(null);
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <MapContainer
        center={[center.lat, center.long]}
        zoom={12}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.map((key, ind) => (
          <Marker
            key={key._id || ind}
            position={[key.geoLocation.lat, key.geoLocation.long]}
            eventHandlers={{ click: () => setHover(key) }}
          />
        ))}
        {Hover && (
          <Popup
            position={[Hover.geoLocation.lat, Hover.geoLocation.long]}
            onClose={() => {
              setHover(null);
            }}
          >
            <div style={{ height: "30px", width: "50px" }}>
              {/* <h4>{Hover.name}</h4> */}
              <img
                src="/avatar.png"
                style={{
                  height: "90px",
                  width: "90px",
                  position: "absolute",
                  marginTop: "-80px",
                  marginLeft: "-20px",
                }}
              />
              <p style={{ textAlign: "center", fontSize: "1rem" }}>
                <strong>{Hover.username}</strong>
              </p>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
};

export default VolunteerMap;
