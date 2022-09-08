import { useState } from "react";
import "./pedido.css";

export const Pedido = () => {
  const [menu, setMenu] = useState(false);
  const [estado, setEstado] = useState("pendiente");

  const isRadioChecked = (value) =>estado === value;

  return (
    <section className="pedido__container">
      {menu && (
        <div className="overlay">
          <div className="pedido__cambiar_estado">
            <h3>
              Estado: <span className={estado}>{estado}</span>
            </h3>
            <hr />
            <form action="">
              <div className="row flex sb">
                <div>
                  <label htmlFor="">Pendiente</label>
                  <input
                    type="radio"
                    value="pendiente"
                    name="estado"
                    onChange={(e) => setEstado(e.target.value)}
                    checked={isRadioChecked("pendiente")}
                  />
                </div>
                <div>
                  <label htmlFor="">Completado</label>
                  <input
                    type="radio"
                    value="completado"
                    name="estado"
                    onChange={(e) => setEstado(e.target.value)}
                    checked={isRadioChecked("completado")}
                  />
                </div>
              </div>
              <div className="row flex center">
                <label htmlFor="">Rechazado</label>
                <input
                  type="radio"
                  value="rechazado"
                  name="estado"
                  onChange={(e) => setEstado(e.target.value)}
                  checked={isRadioChecked("rechazado")}
                  
                />
              </div>

              <textarea
                name="comentarios"
                id="comentarios"
                cols="20"
                rows="5"
                placeholder="Agregar algun comentario de ser necesario..."
              ></textarea>

              <button type="submit" className="btn__estado">Cambiar estado</button>
              <button className="btn__volver" onClick={() => setMenu(false)}>
                Cerrar
              </button>
            </form>
          </div>
        </div>
      )}

      <h2>Info pedido</h2>
      <article className="pedido__card">
        <h3>
          Estado: <span>Pendiente</span>
        </h3>
        <div className="row flex sb">
          <p>Zona</p>
          <p>1</p>
        </div>
        <div className="row flex sb">
          <p>Direccion</p>
          <p>Calle 1234</p>
        </div>
        <div className="row flex sb">
          <p>Nombre</p>
          <p>Juan</p>
        </div>
        <div className="row flex sb">
          <p>Pedido</p>
          <p>10kg pata/muslo</p>
        </div>
        <div className="row flex sb">
          <p>Costo</p>
          <p>$3000</p>
        </div>
        <div className="row flex sb">
          <p>Envio</p>
          <p>$200</p>
        </div>
        <div className="row flex sb">
          <p className="bold">Total</p>
          <p className="bold">$3200</p>
        </div>
        <button className="btn__estado " onClick={() => setMenu(true)}>
          Cambiar estado
        </button>
        <button className="btn__volver">Volver</button>
      </article>
    </section>
  );
};
