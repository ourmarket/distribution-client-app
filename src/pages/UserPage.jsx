import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDeliveryTruckQuery } from "../api/apiDeliveryTruck";
import Loading from "../components/loading/Loading";
import { User } from "../components/user/User";
import { getUser } from "../redux/userSlice";

export const UserPage = () => {
  const dispatch = useDispatch();

  const { user: id } = useSelector((store) => store.authDelivery);
  const { deliveryTruck } = useSelector((store) => store.user);

  const { data: dataUser } = useGetUserDeliveryTruckQuery(id);

  useEffect(() => {
    if (dataUser) {
      dispatch(getUser(dataUser.data.deliveryTruck[0]));
    }
  }, [dataUser, dispatch]);

  return <>{deliveryTruck ? <User /> : <Loading />}</>;
};
