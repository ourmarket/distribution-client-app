import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./user.module.css";
import * as Yup from "yup";
import { usePutUserChangePasswordMutation } from "../../api/apiUser";
import { useState } from "react";
import Swal from "sweetalert2";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  password: Yup.string().min(6, "6 caracteres mínimo").required("Requerido"),
  newPassword: Yup.string().min(6, "6 caracteres mínimo").required("Requerido"),
  newPassword2: Yup.string()
    .min(6, "6 caracteres mínimo")
    .required("Requerido")
    .oneOf([Yup.ref("newPassword")], "Las contraseñas deben ser iguales"),
});

export const ChangePassword = ({ id }) => {
  const navigate = useNavigate();
  const [editUser, { isLoading, isError }] =
    usePutUserChangePasswordMutation(id);
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    try {
      const res = await editUser({ id, ...values }).unwrap();
      if (res.ok) {
        //dispatch(setMenu(false));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Contraseña cambiada con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
      if (error.status === 400) {
        setError(error.data.msg);
      }
    }
  };

  return (
    <div className={styles.change__password__container}>
      <h1>
        <span onClick={() => navigate("/user")}>
          <IoMdArrowRoundBack />
        </span>
        Cambiar contraseña
      </h1>
      <div className={styles.change__password__wrapper}>
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
                className={styles.password_error}
              />
              <Field
                type="password"
                name="newPassword"
                placeholder="Ingresa tu nuevo password"
              />
              <ErrorMessage
                name="newPassword"
                component="p"
                className={styles.password_error}
              />
              <Field
                type="password"
                name="newPassword2"
                placeholder="Re ingresa tu nuevo password"
              />
              <ErrorMessage
                name="newPassword2"
                component="p"
                className={styles.password_error}
              />
              {error && <p style={{ color: "red" }}>{}</p>}
              <button
                style={{ marginTop: "10px" }}
                className={`btn__estado btn-load  ${
                  isLoading ? "button--loading" : ""
                }`}
                type="submit"
                disabled={isLoading}
              >
                <span className={styles.button__text}>Enviar</span>
              </button>
              {isError && (
                <p className={styles.form__error}>
                  ❌Error, tu password no se ha cambiado
                </p>
              )}
              {error && <p className={styles.form__error}>{error}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
