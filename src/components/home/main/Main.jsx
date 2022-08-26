import { BiCalendarAlt, BiCalendarCheck, BiCalendarExclamation } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import {Link} from 'react-router-dom'
import "./main.css";

export const Main = () => {
  return (
    <main className="home__main__container">
      <Link to="/all">
      <article className="home__card__wrapper">
        <h3> <BiCalendarAlt/> <br /> Pedidos para hoy <br /><span>30</span> </h3>
      </article>
      </Link> 
      <Link to="/all">
      <article className="home__card__wrapper">
        <h3><BiCalendarCheck/> <br />Pedidos entregados <br /> <span>10</span></h3>
      </article>
      </Link>
      <Link to="/all">
      <article className="home__card__wrapper">
        <h3><BsTruck /><br />Pedidos pendientes <br /><span>19</span></h3>
      </article>
      </Link>
      <Link to="/all">
      <article className="home__card__wrapper">
        <h3><BiCalendarExclamation/><br />Pedidos rechazados<br /> <span>1</span></h3>
      </article>
      </Link>
    </main>
  );
};
