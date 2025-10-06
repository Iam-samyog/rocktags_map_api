import React, { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";

const MapComponent = () => {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState("");

  const mapContainerStyle = { height: "500px", width: "100%" };
  // Centered in Texas
  const center = { lat: 31.9686, lng: -99.9018 };

  const getDirections = useCallback(() => {
    setError("");
    if (!window.google || !window.google.maps) {
      setError("Google Maps API is not loaded yet. Please try again in a moment.");
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: "Dallas, TX",
        destination: "Houston, TX",
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          setDirections(null);
          setError("Directions request failed: " + status);
        }
      }
    );
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={7}>
        <Marker position={center} />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      <div style={{ marginTop: "10px" }}>
        <button onClick={getDirections}>Get Directions</button>
        {error && (
          <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>
        )}
      </div>
    </LoadScript>
  );
};

export default MapComponent;
