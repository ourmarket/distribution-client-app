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
import {
  getDelivered,
  getOrders,
  getPending,
  getRefused,
} from "../../../redux/ordersSlice";
import { getAllProducts } from "../../../redux/productsSlice";
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

  useEffect(() => {
    if (data) {
      const list = getListProducts(data.data.orders);
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
      <Link to="/ordenes/todos">
        <article className="home__card__wrapper">
          <h3>
            {" "}
            <BiCalendarAlt /> <br /> Pedidos para hoy <br />
            <span>{allOrders.length}</span>
          </h3>
        </article>
      </Link>
      <Link to="/ordenes/entregados">
        <article className="home__card__wrapper">
          <h3>
            <BiCalendarCheck /> <br />
            Pedidos entregados <br /> <span>{delivered.length}</span>
          </h3>
        </article>
      </Link>
      <Link to="/ordenes/pendientes">
        <article className="home__card__wrapper">
          <h3>
            <BsTruck />
            <br />
            Pedidos pendientes <br />
            <span>{pending.length}</span>
          </h3>
        </article>
      </Link>
      <Link to="/ordenes/rechazados">
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
