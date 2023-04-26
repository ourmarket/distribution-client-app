import React from "react";
import { dateToLocalDate } from "../../../utils/dateFormat";
import { formatPrice } from "../../../utils/formatPrice";

export const DataOrder = ({ order }) => {
  return (
    <article className="pedido__card">
      <h3 style={{ textAlign: "center" }}>Datos Pedido</h3>

      <div className="row flex sb">
        <h3>Estado</h3>
        <h3>
          <span className={order.status.toLowerCase()}>{order.status}</span>
        </h3>
      </div>
      {order.deliveryDate && (
        <div className="row flex sb" style={{ paddingTop: "18px" }}>
          <h4>Horario de entrega</h4>
          <h4>{dateToLocalDate(order.deliveryDate)}hs</h4>
        </div>
      )}
      <div className="row flex sb" style={{ paddingTop: "18px" }}>
        <h4>Cant.</h4>
        <h4>Producto</h4>
      </div>
      {order.orderItems.map((item) => (
        <div className="row flex sb" key={item._id}>
          <h3 id="item_totalQuantity">{item.totalQuantity}</h3>
          <p>
            {item.description}. Unid.{" "}
            <span className="unit__price">
              {formatPrice(item.totalPrice / item.totalQuantity)}
            </span>{" "}
          </p>
        </div>
      ))}

      <div className="row flex sb">
        <h4>Subtotal</h4>
        <p>{formatPrice(order.subTotal)}</p>
      </div>
      <div className="row flex sb">
        <h4>Envío</h4>
        <p>${order.tax}</p>
      </div>
      <div className="row flex sb">
        <p className="bold">Total</p>
        <h3>{formatPrice(order.total)}</h3>
      </div>
    </article>
  );
};
