import { useEffect } from "react";
import { Menu } from "../manu/Menu";
import { Navbar } from "../navbar/Navbar";
import { useLocations } from "../../hooks/useLocations";

export const Layout = ({ children }) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  useLocations();
  return (
    <>
      <Navbar />
      {children}
      <Menu />
    </>
  );
};
