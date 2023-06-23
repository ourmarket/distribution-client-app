import React, { useMemo } from "react";
import { GoogleMap, Marker, Polygon } from "@react-google-maps/api";
import { zones } from "./Zones";

const optionZones = {
  fillColor: "#e91e63",
  fillOpacity: 0.2,
  strokeColor: "blue",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

export const Map = ({ coords }) => {
  const local = useMemo(
    () => ({ lat: -34.570428718491605, lng: -58.743382510475065 }),
    []
  );
  const center = useMemo(
    () => ({ lat: coords.lat, lng: coords.lng }),
    [coords]
  );
  const options = useMemo(
    () => ({
      clickableIcons: false,
      styles: [
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
      ],
    }),
    []
  );
  const zone1 = useMemo(
    () => ({
      ...optionZones,
      fillColor: "#e91e63",
    }),
    []
  );
  const zone2 = useMemo(
    () => ({
      ...optionZones,
      fillColor: "#7b809a",
    }),
    []
  );
  const zone3 = useMemo(
    () => ({
      ...optionZones,
      fillColor: "#1A73E8",
    }),
    []
  );
  const zone4 = useMemo(
    () => ({
      ...optionZones,
      fillColor: "#4CAF50",
    }),
    []
  );
  const zone5 = useMemo(
    () => ({
      ...optionZones,
      fillColor: "#fb8c00",
    }),
    []
  );
  const zone6 = useMemo(
    () => ({
      ...optionZones,
      fillColor: "#F44335",
    }),
    []
  );

  return (
    <div>
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerClassName="map-container"
        options={options}
      >
        <Marker position={local} icon="https://i.ibb.co/nbm4b4x/pngegg.png" />

        <Marker
          position={center}
          icon="https://i.ibb.co/p0vpNJ6/6643396-1.png"
        />

        <Polygon paths={zones.zona1} options={zone1} />
        <Polygon paths={zones.zona2} options={zone2} />
        <Polygon paths={zones.zona3} options={zone3} />
        <Polygon paths={zones.zona4} options={zone4} />
        <Polygon paths={zones.zona5} options={zone5} />
        <Polygon paths={zones.zona6} options={zone6} />
      </GoogleMap>
    </div>
  );
};
