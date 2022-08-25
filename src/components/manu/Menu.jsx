import "./menu.css";
import { BiHome } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { BiCheckDouble } from "react-icons/bi";

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
          <a href="#">
            <BiUser />
          </a>
        </li>
      </ul>
    </section>
  );
};
