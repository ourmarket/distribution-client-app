import React from "react";
import { Main } from "../components/home/main/Main";
import { Menu } from "../components/manu/Menu";
import { Navbar } from "../components/navbar/Navbar";

export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Main />
      <Menu />
    </div>
  );
};
