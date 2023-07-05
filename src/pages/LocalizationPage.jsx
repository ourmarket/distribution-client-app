/* eslint-disable react-hooks/exhaustive-deps */
import { useLoadScript } from "@react-google-maps/api";
import Loading from "../components/loading/Loading";

import { Localization } from "../components/localization/Localization";
import { useGetOrderQuery } from "../api/apiOrders";
import { useParams } from "react-router-dom";
import { Error } from "../components/error/Error";
import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";

export const LocalizationPage = () => {
  const { id } = useParams();
  const { data: orderData, isLoading: l1, isError: e1 } = useGetOrderQuery(id);
  const { data: deliveryLocation } = useContext(LocationContext);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ["places", "visualization"],
    language: "ES",
  });

  return (
    <>
      {(l1 || !isLoaded) && <Loading />}
      {e1 && <Error />}
      {orderData && deliveryLocation && (
        <Localization
          order={orderData.data.order}
          deliveryLocation={deliveryLocation}
        />
      )}
    </>
  );
};
