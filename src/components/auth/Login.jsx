import "./auth.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import api from "../../api/api";

const SignupSchema = Yup.object().shape({
  patente: Yup.string().required("Requerido"),
  password: Yup.string().min(6, "6 caracteres minimo").required("Requerido"),
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const { patente, password } = values;
    const { data } = await api.post("/auth/login_repartidor", {
      patente,
      password,
    });

    console.log(data);

    if (data?.token) {
      dispatch(
        login({
          nombre: data.repartidor.nombre,
          patente: data.repartidor.patente,
          jwt: data.token,
        })
      );

      setError(false);
      //console.log("Registro exitoso");
      navigate("/");
    } else {
      setError(true);
      //console.log("Error en el registro");
    }

    setIsLoading(false);
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
          <h2 className="title">Ingresa</h2>
          {error && (
            <p className="login__error">
              Error en el login, intentelo nuevamente
            </p>
          )}
          <Formik
            initialValues={{
              patente: "",
              password: "",
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
            <p>No tienes cuenta?</p> <Link to="/register">Registrate</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
