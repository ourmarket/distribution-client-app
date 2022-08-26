import "./todos.css";
import { Link } from "react-router-dom";

export const Todos = () => {
  return (
    <section className="todos__container">
      <h2>Todos los pedidos</h2>
      <div className="row title">
        <div className="col col-1">
          <p>Zo.</p>
        </div>
        <div className="col col-3">
          <p>Dirección</p>
        </div>
        <div className="col col-3">
          <p>Nombre</p>
        </div>
        <div className="col col-2">
          <p>Estado</p>
        </div>
      </div>
      <div className="row">
        <div className="col col-1">
          <p>1</p>
        </div>
        <div className="col col-3">
          <p>Calle 1233</p>
        </div>
        <div className="col col-3">
          <p>Cristina</p>
        </div>
        <div className="col col-2">
          <Link to="/order/1">
            <button className="btn-estado completado">Estado</button>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col col-1">
          <p>2</p>
        </div>
        <div className="col col-3">
          <p>Calle 1233</p>
        </div>
        <div className="col col-3">
          <p>Juan</p>
        </div>
        <div className="col col-2">
          <button className="btn-estado rachazado">Estado</button>
        </div>
      </div>
      <div className="row">
        <div className="col col-1">
          <p>1</p>
        </div>
        <div className="col col-3">
          <p>Calle 1233</p>
        </div>
        <div className="col col-3">
          <p>Carlos</p>
        </div>
        <div className="col col-2">
          <button className="btn-estado pendiente">Estado</button>
        </div>
      </div>
    </section>
  );
};
