import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePutOrderMutation } from "../../api/apiOrders";
import * as Yup from "yup";
import "./orderDetail.css";
import { dateToLocalDate, formatDateMonth } from "../../utils/dateFormat";
import { PdfViewOrder } from "./PdfViewOrder";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsWhatsapp } from 'react-icons/bs';
// import { usePutProductStockMutation } from "../../api/apiProduct";

const SignupSchema = Yup.object().shape({
  status: Yup.string().required("Requerido"),
});

export const OrderDetail = ({ order, id }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [cash, setCash] = useState(order?.payment?.cash || 0);
  const [transfer, setTransfer] = useState(order?.payment?.transfer || 0);
  const [debt, setDebt] = useState(order?.payment?.debt || 0);

  const [editOrder, { isLoading: l1, isError: e1 }] = usePutOrderMutation();

  const handleSubmit = async (values) => {
    const data = {
      status: values.status,
      commentary: values.commentary,
      deliveryDate: order.deliveryDate ? order.deliveryDate : new Date(),
      paid: cash + transfer === order.total ? true : false,
      payment: {
        cash: cash || 0,
        debt: debt || 0,
        transfer: transfer || 0,
      },
    };

    await editOrder({ id, ...data }).unwrap();

    if (order) {
      setMenu(false);
    }
  };

  const handlerCash = () => {
    const rest = order.total - transfer - debt;
    setCash(rest);
  };
  const handlerTransfer = () => {
    const rest = order.total - cash - debt;
    setTransfer(rest);
  };
  const handlerDebt = () => {
    const rest = order.total - transfer - cash;
    setDebt(rest);
  };

  return (
    <section className="pedido__container" style={{marginBottom: "50px"}}>
      {menu && (
        <div className="overlay">
          <div className="pedido__cambiar_estado">
            <h3>Datos del pedido</h3>
            <hr />
            <Formik
              initialValues={{
                status: order.status,
                cash: cash,
                debt: debt,
                transfer: transfer,
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
                  <Field
                    type="number"
                    name="cash"
                    placeholder="$"
                    value={cash}
                    onChange={(e) => setCash(e.target.value)}
                  />

                  <ErrorMessage
                    name="cash"
                    component="p"
                    className="login__error"
                  />

                  <label htmlFor="">Transferencia</label>
                  <Field
                    type="number"
                    name="transfer"
                    placeholder="$"
                    value={transfer}
                    onChange={(e) => setTransfer(e.target.value)}
                  />

                  <ErrorMessage
                    name="transfer"
                    component="p"
                    className="login__error"
                  />
                  <label htmlFor="">Debe</label>
                  <Field
                    type="number"
                    name="debt"
                    placeholder="$"
                    value={debt}
                    onChange={(e) => setDebt(e.target.value)}
                  />

                  <ErrorMessage
                    name="debt"
                    component="p"
                    className="login__error"
                  />
                  <label htmlFor="">Comentarios</label>
                  <Field
                    as="textarea"
                    type="commentary"
                    name="commentary"
                    placeholder="Agregar algún comentario de ser necesario..."
                    cols="20"
                    rows="3"
                  />
                  <ErrorMessage
                    name="commentary"
                    component="p"
                    className="login__error"
                  />
                  {e1 && (
                    <p style={{ color: "red" }}>
                      Ha ocurrido un error, orden no editada
                    </p>
                  )}
                  <div className="autocomplete-btn__container">
                    <div onClick={handlerCash}>Efectivo</div>
                    <div onClick={handlerTransfer}>Transf.</div>
                    <div onClick={handlerDebt} id="autocomplete-btn-debt">
                      Debe
                    </div>
                  </div>

                  <button
                    className={`btn__estado btn-load  ${
                      l1 ? "button--loading" : ""
                    }`}
                    type="submit"
                    disabled={l1}
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
          <p>Teléfono</p>
          <a
            href={`https://api.whatsapp.com/send/?phone=${order.shippingAddress.phone}&text&type=phone_number&app_absent=0`}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "underline" }}
          >
            <BsWhatsapp/> {order.shippingAddress.phone}
          </a>
        </div>
        <div className="row flex sb">
          <p>Nombre</p>
          <p>
            {order.shippingAddress.name + " " + order.shippingAddress.lastName}
          </p>
        </div>
        <div className="row flex sb">
          <p>Creado</p>
          <p>{dateToLocalDate(order.createdAt)}hs</p>
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
            <p>
              {item.description}. Unidad{" "}
              <span className="unit__price">
                ${item.totalPrice / item.totalQuantity}
              </span>{" "}
            </p>
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

        {order.payment?.cash ||
        order.payment?.transfer ||
        order.payment?.debt ? (
          <>
            <div>
              <h3 style={{ textAlign: "center" }}>Pago</h3>
            </div>
            <div className="row flex sb">
              <h4>Efectivo</h4>
              <h4>${order?.payment?.cash}</h4>
            </div>
            <div className="row flex sb">
              <h4>Transferencia</h4>
              <h4>${order?.payment?.transfer}</h4>
            </div>
            <div className="row flex sb">
              <h4>Debe</h4>
              <h4>${order?.payment?.debt}</h4>
            </div>
          </>
        ) : null}

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
        <PDFDownloadLink
          document={<PdfViewOrder order={order} />}
          fileName={`${order.shippingAddress.name}-${
            order.shippingAddress.lastName
          }-${formatDateMonth(order.createdAt)}.pdf`}
        >
          <button className="btn__volver">Descargar Factura</button>
        </PDFDownloadLink>

        <button className="btn__volver" onClick={() => navigate("/")}>
          Volver
        </button>
      </article>
    </section>
  );
};
