import { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListPaymentOrders,
  getListProducts,
  repeatSum,
} from "../utils/orders";
import {
  getDelivered,
  getOrders,
  getPending,
  getRefused,
} from "../redux/ordersSlice";
import { getAllProducts } from "../redux/productsSlice";
import { LocationContext } from "../context/LocationContext";
import { distance } from "../utils/distance";

export const useGetDataMain = (data) => {
  const dispatch = useDispatch();
  const { data: coords } = useContext(LocationContext);
  const { user } = useSelector((store) => store.authDelivery);

  const filterByDelivery = data.data.orders.filter(
    (order) => order.deliveryTruck.user === user
  );

  const addDistanceOrder = filterByDelivery
    .map((order) => ({
      ...order,
      distance: distance(
        coords.lat,
        coords.lng,
        order.shippingAddress.lat,
        order.shippingAddress.lng
      ),
    }))
    .sort((a, b) => a.distance - b.distance);
  console.log(addDistanceOrder);

  const [orderPayment, setOrderPayment] = useState({});

  useEffect(() => {
    if (data) {
      const list = getListProducts(filterByDelivery);
      const paymentOrders = getListPaymentOrders(filterByDelivery);

      setOrderPayment(paymentOrders);
      const totalList = repeatSum(list);

      const pending = addDistanceOrder
        .filter((order) => order.status === "Pendiente")
        .sort((a, b) => a.distance - b.distance);
      const delivered = addDistanceOrder
        .filter((order) => order.status === "Entregado")
        .sort((a, b) => a.distance - b.distance);
      const refused = addDistanceOrder
        .filter((order) => order.status === "Rechazado")
        .sort((a, b) => a.distance - b.distance);
      dispatch(getOrders(addDistanceOrder));

      dispatch(getPending(pending));
      dispatch(getDelivered(delivered));
      dispatch(getRefused(refused));
      dispatch(getAllProducts(totalList));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    orderPayment,
  };
};
