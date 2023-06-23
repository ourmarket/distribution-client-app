/* eslint-disable react-hooks/exhaustive-deps */
import { useLoadScript } from "@react-google-maps/api";
import { Layout } from "../components/layout/Layout";
import { Map } from "../components/map/Map";
import Loading from "../components/loading/Loading";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(`${process.env.REACT_APP_MAP_API_KEY}/orders/delivery`);

function error(error) {
  alert(`ERROR(${error.code}): ${error.message}`);
}

const options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};

export const MapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ["places", "visualization"],
  });

  // const [isConnected, setIsConnected] = useState(false);
  const [coords, setCoords] = useState({
    lat: -34.570428718491605,
    lng: -58.743382510475065,
  });

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("------------ SOCKET IO CONNECTION --------------");
    });

    function success(position) {
      setCoords({
        lat: position?.coords?.latitude || -34.570428718491605,
        lng: position?.coords?.longitude || -58.743382510475065,
      });
    }

    navigator.geolocation.watchPosition(success, error, options);
  }, []);

  useEffect(() => {
    socket.emit("position", coords);
  }, [coords]);
  return <Layout>{isLoaded ? <Map coords={coords} /> : <Loading />}</Layout>;
};
