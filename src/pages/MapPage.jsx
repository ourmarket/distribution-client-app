/* eslint-disable react-hooks/exhaustive-deps */
import { useLoadScript } from "@react-google-maps/api";
import Loading from "../components/loading/Loading";
import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";
import { AllOrdersMap } from "../components/map/AllOrdersMap";
import { useGetDeliveryZonesQuery } from "../api/deliveryZoneApi";
import { Error } from "../components/error/Error";
import { useGetAllOrdersActiveQuery } from "../api/apiOrders";

export const MapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ["places", "visualization"],
    language: "ES",
  });

  const { data } = useContext(LocationContext);

  const {
    data: dataZones,
    isLoading: l1,
    isError: e1,
  } = useGetDeliveryZonesQuery();
  const {
    data: orders,
    isLoading: l2,
    isError: e2,
  } = useGetAllOrdersActiveQuery();

  return (
    <>
      {(l1 || l2) && <Loading />}
      {(e1 || e2) && <Error />}
      {dataZones && orders && isLoaded && (
        <AllOrdersMap
          data={data}
          zones={dataZones.data.deliveryZones}
          orders={orders.data.orders}
        />
      )}
    </>
  );
};
