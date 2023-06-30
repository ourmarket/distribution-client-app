import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDeliveryTruckQuery } from "../api/apiDeliveryTruck";
import { Main } from "../components/home/main/Main";
import Loading from "../components/loading/Loading";
import { setUser } from "../redux/userSlice";

export const HomePage = () => {
  const dispatch = useDispatch();

  const { user: id } = useSelector((store) => store.authDelivery);
  const { deliveryTruck } = useSelector((store) => store.user);

  const { data: dataUser } = useGetUserDeliveryTruckQuery(id);

  useEffect(() => {
    if (dataUser) {
      dispatch(setUser(dataUser.data.deliveryTruck[0]));
    }
  }, [dataUser, dispatch]);

  return deliveryTruck ? <Main /> : <Loading />;
};
