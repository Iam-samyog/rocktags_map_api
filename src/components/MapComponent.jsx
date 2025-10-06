import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";

const MapComponent = () => {
  const [directions, setDirections] = useState(null);

  const mapContainerStyle = { height: "500px", width: "100%" };
  const center = { lat: 40.7128, lng: -74.0060 };

  const getDirections = () => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: "New York, NY",
        destination: "Washington, DC",
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        }
      }
    );
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={7}>
        <Marker position={center} />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      <div style={{ marginTop: "10px" }}>
        <button onClick={getDirections}>Get Directions</button>
      </div>
    </LoadScript>
  );
};

export default MapComponent;
