import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const users = [];

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [88.434509, 22.975084],
      zoom: 11.15,
    });

    mapRef.current.on("load", () => {
      mapRef.current.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: users.map((user) => ({
            type: "Feature",
            properties: {
              description: `<strong>${user.name}</strong>`,
            },
            geometry: {
              type: "Point",
              coordinates: user.coordinates,
            },
          })),
        },
      });

      mapRef.current.addLayer({
        id: "places",
        type: "circle",
        source: "places",
        paint: {
          "circle-color": "#4264fb",
          "circle-radius": 6,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      mapRef.current.on("mouseenter", "places", (e) => {
        mapRef.current.getCanvas().style.cursor = "pointer";

        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        popup.setLngLat(coordinates).setHTML(description).addTo(mapRef.current);
      });
      mapRef.current.on("mouseleave", "places", () => {
        mapRef.current.getCanvas().style.cursor = "";
        popup.remove();
      });
    });

    return () => mapRef.current.remove();
  }, []);

  return (
    <>
      <div
        id="map"
        ref={mapContainerRef}
        style={{ width: "100%", height: "500px" }}
      />
    </>
  );
};

export default MapComponent;
