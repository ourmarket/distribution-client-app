import "./orderStatus.css";
import { Link } from "react-router-dom";
import { dateToLocalDate } from "../../utils/dateFormat";
import { formatQuantity } from "../../utils/quantityFormat";

export const OrderStatusCard = ({ order }) => {
  return (
    <Link to={`/home/order/${order._id}`}>
      <div className="order__card__container">
        <div className="row">
          <h4>Distancia</h4>
          <p className="order__card__distance">{`${formatQuantity(
            order.distance
          )}km`}</p>
        </div>
        <div className="row">
          <h4>Nombre</h4>
          <p>
            {order.shippingAddress.name + " " + order.shippingAddress.lastName}
          </p>
        </div>
        <div className="row">
          <h4>Dirección</h4>
          <p>{order.shippingAddress.address}</p>
        </div>
        <div className="row">
          <h4>Creado</h4>
          <p>{dateToLocalDate(order.createdAt)}hs</p>
        </div>
        <div className="row">
          <h4>Estado</h4>
          <p>
            <span
              className={`order__status-circle ${order.status.toLowerCase()}`}
            ></span>{" "}
            {order.status}
          </p>
        </div>
      </div>
    </Link>
  );
};
