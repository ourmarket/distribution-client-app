import { useEffect } from "react";
import {
  BiCalendarAlt,
  BiCalendarCheck,
  BiCalendarExclamation,
} from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../../api/apiOrders";
import { getDelivered, getOrders, getPending, getRefused } from "../../../redux/ordersSlice";
import Loading from "../../loading/Loading";
import "./main.css";

export const Main = () => {
  const dispatch = useDispatch();
  const { deliveryTruck } = useSelector((store) => store.user);
  const { data, isLoading } = useGetOrdersQuery(deliveryTruck._id);
  const { allOrders, pending, delivered, refused } = useSelector((store) => store.order);
  
  
  useEffect(() => {
    if (data) {
      const pending = data.data.orders.filter(order => order.status === 'Pendiente')
      const delivered = data.data.orders.filter(order => order.status === 'Entregado')
      const refused = data.data.orders.filter(order => order.status === 'Rechazado')
      dispatch(getOrders(data.data.orders));
     
      dispatch(getPending(pending));
      dispatch(getDelivered(delivered));
      dispatch(getRefused(refused)); 
    }
  }, [data, dispatch]);
  
  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <main className="home__main__container">
      <Link to="/all">
        <article className="home__card__wrapper">
          <h3>
            {" "}
            <BiCalendarAlt /> <br /> Pedidos para hoy <br />
            <span>{allOrders.length}</span>
          </h3>
        </article>
      </Link>
      <Link to="/all">
        <article className="home__card__wrapper">
          <h3>
            <BiCalendarCheck /> <br />
            Pedidos entregados <br /> <span>{delivered.length}</span>
          </h3>
        </article>
      </Link>
      <Link to="/all">
        <article className="home__card__wrapper">
          <h3>
            <BsTruck />
            <br />
            Pedidos pendientes <br />
            <span>{pending.length}</span>
          </h3>
        </article>
      </Link>
      <Link to="/all">
        <article className="home__card__wrapper">
          <h3>
            <BiCalendarExclamation />
            <br />
            Pedidos rechazados
            <br /> <span>{refused.length}</span>
          </h3>
        </article>
      </Link>
    </main>
  );
};
