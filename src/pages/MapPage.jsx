/* eslint-disable react-hooks/exhaustive-deps */
import { useLoadScript } from "@react-google-maps/api";
import { Layout } from "../components/layout/Layout";
import { Map } from "../components/map/Map";
import Loading from "../components/loading/Loading";
import { useSelector } from "react-redux";
import { useLocations } from "../hooks/useLocations";

export const MapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ["places", "visualization"],
  });

  const { deliveryTruck } = useSelector((store) => store.user);

  const { data } = useLocations({
    truckId: deliveryTruck.truckId,
    deliveryName: `${deliveryTruck.user.name}  ${deliveryTruck.user.lastName}`,
  });

  return <Layout>{isLoaded ? <Map data={data} /> : <Loading />}</Layout>;
};
