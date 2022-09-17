import { useEffect, useState } from "react";
import {
  BiCalendarAlt,
  BiCalendarCheck,
  BiCalendarExclamation,
} from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../../api/api";
import { getDelivered, getOrders, getPending, getRefused } from "../../../redux/ordersSlice";
import "./main.css";

export const Main = () => {
  const dispatch = useDispatch();
  

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get("/orders");
      const pending = data.orders.filter(order=>order.state === "pendiente")
      const delievered = data.orders.filter(order=>order.state === "entregado")
      const refused = data.orders.filter(order=>order.state === "rechazado")
      console.log(refused)
      dispatch(getOrders(data))
      dispatch(getPending(pending))
      dispatch(getDelivered(delievered))
      dispatch(getRefused(refused))
    };
    fetchData();
  }, []);

  

  return (
    <main className="home__main__container">
      <Link to="/all">
        <article className="home__card__wrapper">
          <h3>
            {" "}
            <BiCalendarAlt /> <br /> Pedidos para hoy <br />
            <span>30</span>{" "}
          </h3>
        </article>
      </Link>
      <Link to="/all">
        <article className="home__card__wrapper">
          <h3>
            <BiCalendarCheck /> <br />
            Pedidos entregados <br /> <span>10</span>
          </h3>
        </article>
      </Link>
      <Link to="/all">
        <article className="home__card__wrapper">
          <h3>
            <BsTruck />
            <br />
            Pedidos pendientes <br />
            <span>19</span>
          </h3>
        </article>
      </Link>
      <Link to="/all">
        <article className="home__card__wrapper">
          <h3>
            <BiCalendarExclamation />
            <br />
            Pedidos rechazados
            <br /> <span>1</span>
          </h3>
        </article>
      </Link>
    </main>
  );
};
