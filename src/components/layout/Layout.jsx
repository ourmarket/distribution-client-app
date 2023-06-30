import { useEffect } from "react";

import { useLocations } from "../../hooks/useLocations";
import { Menu } from "../tabMenu/Menu";

export const Layout = ({ children }) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  useLocations();
  return (
    <>
      {children}
      <Menu />
    </>
  );
};
