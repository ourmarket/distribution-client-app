import "./todos.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ordersSlice from "../../redux/ordersSlice";

export const Todos = () => {
  const { orders } = useSelector((state) => state.order);

  return (
    <section className="todos__container">
      <h2>Todos los pedidos</h2>
      <div className="row title">
        <div className="col col-1">
          <p>Zo.</p>
        </div>
        <div className="col col-3">
          <p>Dirección</p>
        </div>
        <div className="col col-3">
          <p>Nombre</p>
        </div>
        <div className="col col-2">
          <p>Estado</p>
        </div>
      </div>
      {orders.orders.map((order) => {
        return (
          <div className="row">
            <div className="col col-1">
              <p>1</p>
            </div>
            <div className="col col-3">
              <p>{order.address}</p>
            </div>
            <div className="col col-3">
              <p>{order.name}</p>
            </div>
            <div className="col col-2">
              <Link to="/order/1">
                <button className={`btn-estado ${order.state}`}>{order.state}</button>
              </Link>
            </div>
          </div>
        );
      })}
    </section>
  );
};
