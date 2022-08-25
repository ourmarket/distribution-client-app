import { BiCalendarAlt, BiCalendarCheck, BiCalendarExclamation } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import "./main.css";

export const Main = () => {
  return (
    <main className="home__main__container">
      <article className="home__card__wrapper">
        <h3> <BiCalendarAlt/>Pedidos para hoy <br /><span>30</span> </h3>
      </article>
      <article className="home__card__wrapper">
        <h3><BiCalendarCheck/>Pedidos entregados <br /> 10</h3>
      </article>
      <article className="home__card__wrapper">
        <h3><BiCalendarExclamation/>Pedidos rechazados<br /> 1</h3>
      </article>
      <article className="home__card__wrapper">
        <h3><BsTruck />Pedidos pendientes <br />1</h3>
      </article>
    </main>
  );
};
