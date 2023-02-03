import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDeliveryTruckQuery } from "../api/apiDeliveryTruck";
import { Main } from "../components/home/main/Main";
import { Layout } from "../components/layout/Layout";
import Loading from "../components/loading/Loading";
import { getUser } from "../redux/userSlice";

export const HomePage = () => {
  const dispatch = useDispatch();

  const { user: id } = useSelector((store) => store.authDelivery);
  const { deliveryTruck } = useSelector((store) => store.user);

  const { data: dataUser } = useGetUserDeliveryTruckQuery(id);

  useEffect(() => {
    if (dataUser) {
      dispatch(getUser(dataUser.data.deliveryTruck[0]));
    }
  }, [dataUser, dispatch]);

  return <Layout>{deliveryTruck ? <Main /> : <Loading />}</Layout>;
};
