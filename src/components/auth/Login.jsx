import "./auth.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../api/apiAuth";
import { setCredentials } from "../../redux/authSlice";
import { setUser } from "../../redux/userSlice";

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
    <main className="auth__container">
      <img
        src="https://ik.imagekit.io/mrprwema7/OurMarket/our-market-low-resolution-logo-color-on-transparent-background_tryvGRTNa.png?updatedAt=1695680889949"
        alt="logo"
        className="logo__img"
      />
      <section className="auth__form">
        <div className="auth__form__container">
          <h2 className="title">Ingresar</h2>
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
                <div className="input__container">
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
                  className="login__error"
                />
                <div className="input__container">
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
