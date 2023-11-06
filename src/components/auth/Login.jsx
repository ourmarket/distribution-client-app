import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../api/apiAuth";
import { setCredentials } from "../../redux/authSlice";
import { setUser } from "../../redux/userSlice";
import styles from "./auth.module.css";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Formato invalido").required("Requerido"),
  password: Yup.string().min(6, "6 caracteres mínimo").required("Requerido"),
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginDelivery, { isLoading, isError }] = useLoginMutation();

  const handleSubmit = async (values) => {
    try {
      const userData = await loginDelivery({
        email: values.email,
        password: values.password,
      }).unwrap();

      if (userData) {
        dispatch(setCredentials({ ...userData }));
        dispatch(setUser(userData.deliveryTruck));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={styles.auth__container}>
      <img
        src="https://ik.imagekit.io/mrprwema7/OurMarket/our-market-low-resolution-logo-color-on-transparent-background_tryvGRTNa.png?updatedAt=1695680889949"
        alt="logo"
        className={styles.logo__img}
      />
      <section className={styles.auth__form}>
        <div className={styles.auth__form__container}>
          <h2 className={styles.title}>Ingresar</h2>
          {isError && (
            <p className={styles.login__error}>
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
                <div className={styles.input__container}>
                  <img
                    src="https://ik.imagekit.io/mrprwema7/OurMarket/user_OkKLt0tst%20(1)__K2sUFDZJ.png?updatedAt=1695681678392"
                    alt="icono usuario"
                  />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Ingresa tu email"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="p"
                  className={styles.login__error}
                />

                <div className={styles.input__container}>
                  <img
                    src="https://ik.imagekit.io/mrprwema7/OurMarket/password_sMXDhy2rr%20(1)_Z8pTPQmhK.png?updatedAt=1695681678685"
                    alt="icono password"
                  />
                  <Field
                    type="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className={styles.login__error}
                />

                <button
                  className={`btn-load ${isLoading ? "button--loading" : ""}`}
                  type="submit"
                  disabled={isLoading}
                >
                  <span className={styles.button__text}>Enviar</span>
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
};
