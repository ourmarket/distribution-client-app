/* eslint-disable react-hooks/exhaustive-deps */
import { useLoadScript } from "@react-google-maps/api";
import Loading from "../components/loading/Loading";
import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";
import { AllOrdersMap } from "../components/map/AllOrdersMap";

export const MapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ["places", "visualization"],
    language: "ES",
  });

  const { data } = useContext(LocationContext);

  return isLoaded ? <AllOrdersMap data={data} /> : <Loading />;
};
