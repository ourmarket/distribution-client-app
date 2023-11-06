import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/formatPrice";
import { useGetDataMain } from "../../../hooks/useGetDataMain";
import styles from "./main.module.css";
import { useSelector } from "react-redux";

export const Main = ({ data }) => {
  const { orderPayment } = useGetDataMain(data);
  const { allOrders, delivered, pending, refused } = useSelector(
    (store) => store.order
  );

  return (
    <main className={styles.home__main__container}>
      <div></div>
      <div className={styles.home__main__resume}>
        <h3>Resumen de pagos</h3>
        <hr />
        <div className={styles.home__main__row}>
          <h4>Efectivo</h4>
          <h4>{orderPayment.cash ? formatPrice(orderPayment.cash) : "$0"}</h4>
        </div>
        <div className={styles.home__main__row}>
          <h4>Transferencia</h4>
          <h4>
            {orderPayment.transfer ? formatPrice(orderPayment.transfer) : "$0"}
          </h4>
        </div>
        <div className={styles.home__main__row}>
          <h4>Deudas</h4>
          <h4>{orderPayment.debt ? formatPrice(orderPayment.debt) : "$0"}</h4>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Link to="/home/ordenes/todos">
          <article className={styles.home__card__wrapper}>
            <h3>Total</h3>
            <span className={`${styles.orders} ${styles.total_orders}`}>
              {allOrders.length}
            </span>
          </article>
        </Link>
        <Link to="/home/ordenes/entregados">
          <article className={styles.home__card__wrapper}>
            <h3>Entregados</h3>
            <span className={`${styles.orders} ${styles.delivered_orders}`}>
              {delivered.length}
            </span>
          </article>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Link to="/home/ordenes/pendientes">
          <article className={styles.home__card__wrapper}>
            <h3>Pendientes</h3>
            <span className={`${styles.orders} ${styles.pending_orders}`}>
              {pending.length}
            </span>
          </article>
        </Link>
        <Link to="/home/ordenes/rechazados">
          <article className={styles.home__card__wrapper}>
            <h3>Rechazados</h3>
            <span className={`${styles.orders} ${styles.refused_orders}`}>
              {refused.length}
            </span>
          </article>
        </Link>
      </div>
    </main>
  );
};
