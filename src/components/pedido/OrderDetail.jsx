import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePutOrderMutation } from "../../api/apiOrders";
import * as Yup from "yup";
import "./orderDetail.css";

const SignupSchema = Yup.object().shape({
  status: Yup.string().required("Requerido"),
});

export const OrderDetail = ({ order, id }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  const [editOrder, { isLoading, isError }] = usePutOrderMutation();

  const handleSubmit = async (values) => {
    const data = {
      status: values.status,
      commentary: values.commentary,
      payment: {
        cash: values.cash || 0,
        debt: values.debt || 0,
        transfer: values.transfer || 0,
      },
    };
    console.log(data);
    const orderData = await editOrder({ id, ...data }).unwrap();
    console.log(orderData);
  
    if (order) {
      setMenu(false);
    }
  };

  return (
    <section className="pedido__container">
      {menu && (
        <div className="overlay">
          <div className="pedido__cambiar_estado">
            <h3>Datos del pedido</h3>
            <hr />
            <Formik
              initialValues={{
                status: order.status,
                cash: order?.payment?.cash || undefined,
                debt: order?.payment?.debt || undefined,
                transfer: order?.payment?.transfer || undefined,
                commentary: order?.commentary || undefined,
              }}
              validationSchema={SignupSchema}
              onSubmit={(values, { resetForm }) => {
                handleSubmit(values);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <label htmlFor="">Estado</label>
                  <Field as="select" name="status">
                    <option value="" disable="true">
                      Seleccionar estado del pedido
                    </option>
                    <option value="Entregado">Entregado</option>
                    <option value="Rechazado">Rechazado</option>
                  </Field>
                  <ErrorMessage
                    name="status"
                    component="p"
                    className="login__error"
                  />

                  <label htmlFor="">Efectivo</label>
                  <Field type="number" name="cash" placeholder="$" />

                  <ErrorMessage
                    name="cash"
                    component="p"
                    className="login__error"
                  />

                  <label htmlFor="">Transferencia</label>
                  <Field type="number" name="transfer" placeholder="$" />

                  <ErrorMessage
                    name="transfer"
                    component="p"
                    className="login__error"
                  />
                  <label htmlFor="">Debe</label>
                  <Field type="number" name="debt" placeholder="$" />

                  <ErrorMessage
                    name="debt"
                    component="p"
                    className="login__error"
                  />
                  <label htmlFor="">Comentarios</label>
                  <Field
                    as="textarea"
                    type="password"
                    name="password"
                    placeholder="Agregar algún comentario de ser necesario..."
                    cols="20"
                    rows="3"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="login__error"
                  />
                  {isError && (
                    <p style={{ color: "red" }}>
                      Ha ocurrido un error, orden no editada
                    </p>
                  )}

                  <button
                    className={`btn__estado btn-load  ${
                      isLoading ? "button--loading" : ""
                    }`}
                    type="submit"
                    disabled={isLoading}
                  >
                    <span className="button__text">Enviar</span>
                  </button>
                  <button
                    className="btn__volver"
                    onClick={() => setMenu(false)}
                  >
                    Cerrar
                  </button>
                </Form>
              )}
            </Formik>
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
        <div className="row flex sb">
          <h4>Cant.</h4>
          <h4>Producto</h4>
        </div>
        {order.orderItems.map((item) => (
          <div className="row flex sb" key={item._id}>
            <h3 id="item_totalQuantity">{item.totalQuantity}</h3>
            <p>{item.name}</p>
          </div>
        ))}

        <div className="row flex sb">
          <h4>Subtotal</h4>
          <p>${order.subTotal}</p>
        </div>
        <div className="row flex sb">
          <h4>Envío</h4>
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
        <button className="btn__volver" onClick={() => navigate("/")}>
          Volver
        </button>
      </article>
    </section>
  );
};
