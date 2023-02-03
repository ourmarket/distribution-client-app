import "./auth.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../api/apiAuth";
import { setCredentials } from "../../redux/authSlice";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Formato invalido").required("Requerido"),
  password: Yup.string().min(6, "6 caracteres mínimo").required("Requerido"),
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginDelivery, { isLoading, isError }] = useLoginMutation();

  const handleSubmit = async (values, resetForm) => {
    try {
      const userData = await loginDelivery({
        email: values.email,
        password: values.password,
      }).unwrap();
      if (userData) {
        dispatch(setCredentials({ ...userData }));
        
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
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
          {isError && (
            <p className="login__error">
              Error en el login, inténtelo nuevamente
            </p>
          )}
          <Formik
            initialValues={{
              email: "",
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
                  type="email"
                  name="email"
                  placeholder="Ingresa tu email"
                />

                <ErrorMessage
                  name="email"
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
        </div>
      </section>
    </main>
  );
};
