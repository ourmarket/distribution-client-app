import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePutOrderMutation } from "../../api/apiOrders";
import "./orderDetail.css";

export const OrderDetail = ({ order, id }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [commentary, setCommentary] = useState("");
  const [estado, setEstado] = useState(order.status);

  const isRadioChecked = (value) => estado === value;

  const [editOrder, { isLoading, isError }] = usePutOrderMutation();

  const handleSubmit = async () => {
    const data = {
      status: estado,
      commentary,
    };
    const order = await editOrder({ id, ...data }).unwrap();
    if(order){
     setMenu(false)
    } 
  };

  return (
    <section className="pedido__container">
      {menu && (
        <div className="overlay">
          <div className="pedido__cambiar_estado">
            <h3>
              Estado: <span className={estado.toLowerCase()}>{estado}</span>
            </h3>
            <hr />
            <form action="">
              <div className="row flex sb">
                <div>
                  <label htmlFor="">Pendiente</label>
                  <input
                    type="radio"
                    value="Pendiente"
                    name="estado"
                    onChange={(e) => setEstado(e.target.value)}
                    checked={isRadioChecked("Pendiente")}
                  />
                </div>
                <div>
                  <label htmlFor="">Entregado</label>
                  <input
                    type="radio"
                    value="Entregado"
                    name="estado"
                    onChange={(e) => setEstado(e.target.value)}
                    checked={isRadioChecked("Entregado")}
                  />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <label htmlFor="">Rechazado</label>
                <input
                  type="radio"
                  value="Rechazado"
                  name="estado"
                  onChange={(e) => setEstado(e.target.value)}
                  checked={isRadioChecked("Rechazado")}
                />
              </div>

              <textarea
                name="comentarios"
                id="comentarios"
                cols="20"
                rows="5"
                placeholder="Agregar algún comentario de ser necesario..."
                onChange={(e) => setCommentary(e.target.value)}
              ></textarea>

              <button
                onClick={handleSubmit}
                className={`btn__estado btn-load  ${
                  isLoading ? "button--loading" : ""
                }`}
                type="submit"
                disabled={isLoading}
              >
                <span className="button__text"> Cambiar estado</span>
              </button>
              <button className="btn__volver" onClick={() => setMenu(false)}>
                Cerrar
              </button>
              {
                isError && <p style={{color: 'red'}}>Ha ocurrido un error, orden no actualizada</p>
              }
            </form>
          </div>
        </div>
      )}

      <h2>Info pedido</h2>
      <article className="pedido__card">
        <h3>
          Estado:{" "}
          <span className={order.status.toLowerCase()}>{order.status}</span>
        </h3>
        <div className="row flex sb">
          <p>Zona</p>
          <p>{order.deliveryZone.name}</p>
        </div>
        <div className="row flex sb">
          <p>Dirección</p>
          <p>{order.shippingAddress.address}</p>
        </div>
        <div className="row flex sb">
          <p>Nombre</p>
          <p>
            {order.shippingAddress.name + " " + order.shippingAddress.lastName}
          </p>
        </div>
        <div>
          <h3 style={{ textAlign: "center" }}>Pedido</h3>
        </div>
        {order.orderItems.map((item) => (
          <div className="row flex sb" key={item._id}>
            <p>Cant. {item.totalQuantity}</p>
            <p>{item.name}</p>
          </div>
        ))}

        <div className="row flex sb">
          <p>Subtotal</p>
          <p>${order.subTotal}</p>
        </div>
        <div className="row flex sb">
          <p>Envío</p>
          <p>${order.tax}</p>
        </div>
        <div className="row flex sb">
          <p className="bold">Total</p>
          <h3>${order.total}</h3>
        </div>
        {order.commentary && (
          <>
            <div>
              <h3 style={{ textAlign: "center" }}>Comentario</h3>
            </div>
            <div className="row flex sb">
              <p>{order.commentary}</p>
            </div>
          </>
        )}

        <button className="btn__estado " onClick={() => setMenu(true)}>
          Cambiar estado
        </button>
        <button className="btn__volver" onClick={() => navigate('/')}>
          Volver
        </button>
      </article>
    </section>
  );
};
