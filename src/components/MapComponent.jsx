import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";

const libraries = ["places"];

const MapComponent = () => {
  const [origin, setOrigin] = useState("Dallas");
  const [destination, setDestination] = useState("Houston");
  const [pins, setPins] = useState([]); // Array of pin positions
  const cities = [
    { name: "Arlington", lat: 32.7357, lng: -97.1081 },
    { name: "Houston", lat: 29.7604, lng: -95.3698 },
    { name: "Dallas", lat: 32.7767, lng: -96.7970 },
    { name: "Austin", lat: 30.2672, lng: -97.7431 },
    { name: "San Antonio", lat: 29.4241, lng: -98.4936 },
    { name: "El Paso", lat: 31.7619, lng: -106.4850 },
    { name: "Fort Worth", lat: 32.7555, lng: -97.3308 },
  ];

  const getLatLng = (cityName) => {
    const city = cities.find(c => c.name === cityName);
    return city ? { lat: city.lat, lng: city.lng } : { lat: 31.9686, lng: -99.9018 };
  };



  const mapContainerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 0
  };
  // Centered on UT Arlington
  const center = { lat: 32.7318, lng: -97.1106 };
  const defaultZoom = 15;



  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={defaultZoom}
        onClick={e => {
          setPins([...pins, { lat: e.latLng.lat(), lng: e.latLng.lng() }]);
        }}
      >
        {pins.map((pin, idx) => (
          <Marker key={idx} position={pin} />
        ))}
      </GoogleMap>
  {/* Dropdowns removed. Only map and pins remain. */}
    </LoadScript>
  );
};

export default MapComponent;
