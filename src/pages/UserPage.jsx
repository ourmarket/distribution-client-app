import { useGetUserDeliveryTruckQuery } from "../api/apiDeliveryTruck";
import { Error } from "../components/error/Error";
import Loading from "../components/loading/Loading";
import { User } from "../components/user/User";

import { useParams } from "react-router-dom";

export const UserPage = () => {
  const { id } = useParams();

  const {
    data: dataUser,
    isLoading,
    isError,
  } = useGetUserDeliveryTruckQuery(id);

  return (
    <>
      {isError && <Error />}
      {isLoading && <Loading />}
      {dataUser && <User deliveryTruck={dataUser.data.deliveryTruck[0]} />}
    </>
  );
};
