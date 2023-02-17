import { useEffect, useState } from "react";
import {
  BiCalendarAlt,
  BiCalendarCheck,
  BiCalendarExclamation,
} from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../../api/apiOrders";
import {
  getDelivered,
  getOrders,
  getPending,
  getRefused,
} from "../../../redux/ordersSlice";
import { getAllProducts } from "../../../redux/productsSlice";
import { formatPrice } from "../../../utils/formatPrice";
import Loading from "../../loading/Loading";
import "./main.css";

const getListProducts = (orders) => {
  const listOfProducts = orders.map((product) => product.orderItems);

  const list = [];
  for (let i = 0; i < listOfProducts.length; i++) {
    const element = listOfProducts[i];
    for (let x = 0; x < element.length; x++) {
      list.push(element[x]);
    }
  }

  return list;
};
const getListPaymentOrders = (orders) => {
  const listOfProducts = orders.map((product) => product.payment);
  const cash = listOfProducts.reduce((acc, cur) => acc + cur.cash, 0);
  const transfer = listOfProducts.reduce((acc, cur) => acc + cur.transfer, 0);
  const debt = listOfProducts.reduce((acc, cur) => acc + cur.debt, 0);

  return {
    cash,
    transfer,
    debt,
  };
};

const repeatSum = (arr) => {
  let arrProductsNonDupli = [];
  let arrProductsIdCounted = [];
  arr.forEach((product, indxA, arrProducts) => {
    // validar si el product ya fue contado en la busqueda de duplicados
    const isCountryCounted = arrProductsIdCounted.includes(product.productId);
    // Si no ha sido contado
    if (!isCountryCounted) {
      arrProductsIdCounted.push(product.productId);

      // Buscar cuantas coincidencias existen del product en el array
      const countriesToCount = arrProducts.filter(
        (ele) => ele.productId === product.productId
      );

      //console.log(countriesToCount);

      const country =
        countriesToCount.length > 1
          ? {
              ...product,
              totalQuantity: countriesToCount.reduce(
                (acc, cur) => acc + cur.totalQuantity,
                0
              ),
            }
          : product;

      arrProductsNonDupli.push(country);
    }
  });

  console.log(arrProductsNonDupli);
  return arrProductsNonDupli;
};

export const Main = () => {
  const dispatch = useDispatch();
  const { deliveryTruck } = useSelector((store) => store.user);
  const { data, isLoading } = useGetOrdersQuery(deliveryTruck._id);
  const { allOrders, pending, delivered, refused } = useSelector(
    (store) => store.order
  );
  const [orderPayment, setOrderPayment] = useState({});

  useEffect(() => {
    if (data) {
      const list = getListProducts(data.data.orders);
      const paymentOrders = getListPaymentOrders(data.data.orders);
      console.table(paymentOrders);
      setOrderPayment(paymentOrders);
      const totalList = repeatSum(list);

      const pending = data.data.orders.filter(
        (order) => order.status === "Pendiente"
      );
      const delivered = data.data.orders.filter(
        (order) => order.status === "Entregado"
      );
      const refused = data.data.orders.filter(
        (order) => order.status === "Rechazado"
      );
      dispatch(getOrders(data.data.orders));

      dispatch(getPending(pending));
      dispatch(getDelivered(delivered));
      dispatch(getRefused(refused));
      dispatch(getAllProducts(totalList));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="home__main__container">
      <div className="home__main__resume">
        <h3>Resumen de pagos</h3>
        <hr />
      
        <div className="home__main__row">
          <h4>Efectivo</h4>
          <h4>{orderPayment.cash ? formatPrice(orderPayment.cash) : '$0'}</h4>
        </div>
        <div className="home__main__row">
          <h4>Transferencia</h4>
          <h4>{orderPayment.transfer ? formatPrice(orderPayment.transfer) : '$0'}</h4>
        </div>
        <div className="home__main__row">
          <h4>Deben</h4>
          <h4>{orderPayment.debt ? formatPrice(orderPayment.debt) : '$0'}</h4>
        </div>
      </div>

      <Link to="/ordenes/todos">
        <article className="home__card__wrapper">
          <h3>Total pedidos</h3>
          <span className="orders total_orders">{allOrders.length}</span>
        </article>
      </Link>
      <Link to="/ordenes/entregados">
        <article className="home__card__wrapper">
          <h3>Pedidos entregados</h3>
          <span className="orders delivered_orders">{delivered.length}</span>
        </article>
      </Link>
      <Link to="/ordenes/pendientes">
        <article className="home__card__wrapper">
          <h3>Pedidos pendientes</h3>
          <span className="orders pending_orders">{pending.length}</span>
        </article>
      </Link>
      <Link to="/ordenes/rechazados">
        <article className="home__card__wrapper">
          <h3>Pedidos rechazados</h3>
          <span className="orders refused_orders">{refused.length}</span>
        </article>
      </Link>
    </main>
  );
};
