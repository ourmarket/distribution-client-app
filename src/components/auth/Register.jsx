import "./auth.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Requerido"),
  email: Yup.string().email("Email invalido").required("Requerido"),
  password: Yup.string().min(6, "6 caracteres minimo").required("Requerido"),
  rePassword: Yup.string()
    .min(6, "6 caracteres minimo")
    .required("Requerido")
    .oneOf([Yup.ref("password")], "Las contraseñas deben ser iguales"),
});

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (values) => {
    /*  setIsLoading(true);

    const response = await registerApi(values);

    //console.log(response);

    if (response?.jwt) {
      dispatch(
        login({
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
          jwt: response.jwt,
        })
      );

      setError(false);
      //console.log("Registro exitoso");
      navigate("/");
    } else {
      setError(true);
      //console.log("Error en el registro");
    }

    setIsLoading(false); */
  };

  return (
    <main className="auth__container">
      <header className="navbar__container">
        <div className="navbar__logo">
          <img src="/images/logo/logo.png" alt="logo" />
        </div>
      </header>
      <section className="auth__form">
        <div className="auth__form__container">
            
       
        <h2 className="title">Registrate</h2>
        {error && (
          <p className="login__error">
            Error en el registro, intentelo nuevamente
          </p>
        )}
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            rePassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="text"
                name="nombre"
                placeholder="Ingresa tu nombre completo"
              />

              <ErrorMessage
                name="nombre"
                component="p"
                className="login__error"
              />
              <Field
                type="text"
                name="patente"
                placeholder="Ingresa la patente del vehiculo"
              />

              <ErrorMessage
                name="patente"
                component="p"
                className="login__error"
              />

              <Field
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="login__error"
              />

              <Field
                type="password"
                name="rePassword"
                placeholder="Repite tu contraseña"
              />
              <ErrorMessage
                name="rePassword"
                component="p"
                className="login__error"
              />

              <button
                className={`btn-load ${isLoading ? "button--loading" : ""}`}
                type="submit"
                disabled={isLoading}
              >
                <span className="button__text">Enviar</span>
              </button>
            </Form>
          )}
        </Formik>
        <div className="auth__link">
          <p>Ya tienes cuenta?</p> <Link to="/login">Ingresa</Link>
        </div>
        </div>
      </section>
    </main>
  );
};
