import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const [viewport, setViewport] = useState({
    lng: 5,
    lat: 34,
    zoom: 2
  });
  const containerRef = useRef(null);

  useEffect(() => {
    const { lng, lat, zoom } = viewport;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom
    });

    map.on("move", () => {
      setViewport({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map__container" ref={containerRef} />;
};

export default Map;
