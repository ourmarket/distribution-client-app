import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  useGetClientOrderDebtQuery,
  usePutOrderMutation,
} from "../../api/apiOrders";
import * as Yup from "yup";
import "./orderDetail.css";
import Loading from "../loading/Loading";
import { OrderDetailMain } from "./componets/OrderDetailMain";

const SignupSchema = Yup.object().shape({
  status: Yup.string().required("Requerido"),
});

export const OrderDetail = ({ order, id }) => {
  const [menu, setMenu] = useState(false);

  const [cash, setCash] = useState(order?.payment?.cash || 0);
  const [transfer, setTransfer] = useState(order?.payment?.transfer || 0);
  const [debt, setDebt] = useState(order?.payment?.debt || 0);

  const { data: ordersDebt, isLoading: l2 } = useGetClientOrderDebtQuery(
    order.client
  );

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

  if (l2) {
    return <Loading />;
  }

  const unpaidOrders = ordersDebt?.data?.orders;
  console.log(unpaidOrders);

  return (
    <section className="pedido__container" style={{ marginBottom: "50px" }}>
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

      <OrderDetailMain
        order={order}
        unpaidOrders={unpaidOrders}
        setMenu={setMenu}
      />
    </section>
  );
};
