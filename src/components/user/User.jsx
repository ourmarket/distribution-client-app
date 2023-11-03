import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/authSlice";

import "./user.css";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const { deliveryTruck } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <main className="user__container">
        <h1>Mi perfil</h1>
        <section className="user__section">
          <h3>Datos personales</h3>
          <hr />
          <div className="user__section__row">
            <h4>Nombre </h4>
            <p>
              {deliveryTruck?.user?.name} {deliveryTruck?.user?.lastName}
            </p>
          </div>
          <div className="user__section__row">
            <h4>Email </h4>
            <p>{deliveryTruck?.user?.email}</p>
          </div>
          <div className="user__section__row">
            <h4>Teléfono </h4>
            <p>{deliveryTruck?.user?.phone}</p>
          </div>
          <hr />
          <h3>Datos del vehículo</h3>
          <hr />
          <div className="user__section__row">
            <h4>Patente </h4>
            <p>{deliveryTruck?.patent}</p>
          </div>
          <div className="user__section__row">
            <h4>Carga maxima </h4>
            <p>{deliveryTruck?.maximumLoad} kg</p>
          </div>
          <div className="user__section__row">
            <h4>Cámara de frio </h4>
            <p>{deliveryTruck?.coldChamber ? "Si" : "No"}</p>
          </div>

          <button
            className="btn-load password"
            onClick={() =>
              navigate(`/user/cambiar-password/${deliveryTruck.user._id}`)
            }
          >
            Cambiar contraseña
          </button>
          <button className="btn-load" onClick={() => dispatch(logOut())}>
            Cerrar sesión
          </button>
        </section>
      </main>
    </>
  );
};
