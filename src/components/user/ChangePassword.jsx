import { ErrorMessage, Field, Form, Formik } from "formik";
import "./user.css";
import * as Yup from "yup";
import { usePutUserChangePasswordMutation } from "../../api/apiUser";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const SignupSchema = Yup.object().shape({
  password: Yup.string().min(6, "6 caracteres mínimo").required("Requerido"),
  newPassword: Yup.string().min(6, "6 caracteres mínimo").required("Requerido"),
  newPassword2: Yup.string()
    .min(6, "6 caracteres mínimo")
    .required("Requerido")
    .oneOf([Yup.ref("newPassword")], "Las contraseñas deben ser iguales"),
});

export const ChangePassword = ({ id, setMenu }) => {
  const dispatch = useDispatch();
  
  const [editUser, { isLoading, isError }] =
    usePutUserChangePasswordMutation(id);
  const [error, setError] = useState("");
  
  const handleSubmit = async (values) => {
    console.log(values)
    try {
      const res = await editUser({ id, ...values }).unwrap();
      if (res) {
        //dispatch(setMenu(false));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Contraseña cambiada con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
        dispatch(setMenu(false));
      }
    } catch (error) {
      console.log(error);
      if (error.status === 400) {
        setError(error.data.msg);
      }
    }
  };
 
  

  return (
    <div className="overlay">
      <div className="change__password__container">
        <h3>Cambiar contraseña</h3>

        <Formik
          initialValues={{
            password: "",
            newPassword: "",
            newPassword2: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña actual"
              />

              <ErrorMessage
                name="password"
                component="p"
                className="login__error"
              />
              <Field
                type="password"
                name="newPassword"
                placeholder="Ingresa tu nuevo password"
              />

              <ErrorMessage
                name="newPassword"
                component="p"
                className="login__error"
              />
              <Field
               type="password"
                name="newPassword2"
                placeholder="Re ingresa tu nuevo password"
              />

              <ErrorMessage
                name="newPassword2"
                component="p"
                className="login__error"
              />

              {error && <p style={{ color: "red" }}>{}</p>}

              <button
                className={`btn__estado btn-load  ${
                  isLoading ? "button--loading" : ""
                }`}
                type="submit"
                disabled={isLoading}
              >
                <span className="button__text">Enviar</span>
              </button>
              <button className="btn__volver" onClick={() => setMenu(false)}>
                Cerrar
              </button>
              {isError && (
                <p className="form__error">
                  ❌Error, tu password no se ha cambiado
                </p>
              )}
              {error && <p className="form__error">{error}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
