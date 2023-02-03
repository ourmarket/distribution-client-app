import { Menu } from "../manu/Menu";
import { Navbar } from "../navbar/Navbar";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Menu />
    </>
  );
};
