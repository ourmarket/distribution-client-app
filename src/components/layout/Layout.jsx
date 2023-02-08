import { useEffect } from "react";
import { Menu } from "../manu/Menu";
import { Navbar } from "../navbar/Navbar";

export const Layout = ({ children }) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  return (
    <>
      <Navbar />
      {children}
      <Menu />
    </>
  );
};
