import "./menu.css";
import { BiHome } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BsCartPlus, BsTruck } from "react-icons/bs";
import { BiCheckDouble } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const Menu = () => {
  const { pathname } = useLocation();
  console.log(window.screen.width);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    setWidth(window.screen.width);
  }, []);
  useEffect(() => {
    const ancho = (width - 20) / 5;
    const medida1 = (ancho - 70) / 2;
    const medida2 = ancho + medida1;
    const medida3 = ancho * 2 + medida1;
    const medida4 = ancho * 3 + medida1;
    const medida5 = ancho * 4 + medida1;
    document.documentElement.style.setProperty("--widthMenu1", `${medida1}px`);
    document.documentElement.style.setProperty("--widthMenu2", `${medida2}px`);
    document.documentElement.style.setProperty("--widthMenu3", `${medida3}px`);
    document.documentElement.style.setProperty("--widthMenu4", `${medida4}px`);
    document.documentElement.style.setProperty("--widthMenu5", `${medida5}px`);
  }, [width]);

  return (
    <>
      <section className="menu__container">
        <ul className="list__ul">
          <li className={pathname === "/" ? "list__li active" : "list__li"}>
            <Link to={"/"}>
              <BiHome />
              <span className="menu__title">Home</span>
            </Link>
          </li>
          <li
            className={
              pathname === "/ordenes/pendientes"
                ? "list__li active"
                : "list__li"
            }
          >
            <Link to={"/ordenes/pendientes"}>
              <BsTruck />
              <span className="menu__title">Pendien.</span>
            </Link>
          </li>
          <li
            className={
              pathname === "/ordenes/entregados"
                ? "list__li active"
                : "list__li"
            }
          >
            <Link to={"/ordenes/entregados"}>
              <BiCheckDouble />
              <span className="menu__title">Entreg.</span>
            </Link>
          </li>
          <li
            className={
              pathname === "/productos" ? "list__li active" : "list__li"
            }
          >
            <Link to={"/productos"}>
              <BsCartPlus />
              <span className="menu__title">Produc.</span>
            </Link>
          </li>
          <li className={pathname === "/user" ? "list__li active" : "list__li"}>
            <Link to="/user">
              <BiUser />
              <span className="menu__title">Perfil</span>
            </Link>
          </li>
          <div class="indicator"></div>
        </ul>
      </section>
      <div class="white"></div>
    </>
  );
};
