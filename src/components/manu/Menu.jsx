import "./menu.css";
import { BiHome } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { BiCheckDouble } from "react-icons/bi";
import {Link} from "react-router-dom"

export const Menu = () => {
  return (
    <section className="menu__container">
      <ul>
        <li>
          <a href="#">
            <BiHome />
          </a>
        </li>
        <li>
          <a href="#">
            <BsTruck />
          </a>
        </li>
        <li>
          <a href="#"><BiCheckDouble /></a>
        </li>
        <li>
          <Link to="/user">
            <BiUser />
          </Link>
        </li>
      </ul>
    </section>
  );
};
