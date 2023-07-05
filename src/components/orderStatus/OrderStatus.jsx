import "./orderStatus.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { OrderStatusCard } from "./OrderStatusCard";
import { IoMdArrowRoundBack } from "react-icons/io";

export const OrderStatus = () => {
  const { status } = useParams();
  const { allOrders, pending, delivered, refused } = useSelector(
    (state) => state.order
  );
  const navigate = useNavigate();

  return (
    <section className="todos__container">
      <h2>
        <span onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack />
        </span>
        Lista de pedidos
      </h2>
      {status === "todos" && (
        <div>
          {allOrders.map((order) => (
            <OrderStatusCard order={order} />
          ))}
        </div>
      )}
      {status === "pendientes" && (
        <div>
          {pending.length > 0 ? (
            pending.map((order) => <OrderStatusCard order={order} />)
          ) : (
            <p> No hay pedidos pendientes </p>
          )}
        </div>
      )}
      {status === "entregados" && (
        <div>
          {delivered.length > 0 ? (
            delivered.map((order) => <OrderStatusCard order={order} />)
          ) : (
            <p> No hay pedidos entregados </p>
          )}
        </div>
      )}
      {status === "rechazados" && (
        <div>
          {refused.length > 0 ? (
            refused.map((order) => <OrderStatusCard order={order} />)
          ) : (
            <p> No hay pedidos rechazados </p>
          )}
        </div>
      )}
    </section>
  );
};
