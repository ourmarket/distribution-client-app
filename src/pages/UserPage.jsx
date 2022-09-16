import React from "react";
import { Menu } from "../components/manu/Menu";
import { Navbar } from "../components/navbar/Navbar";
import { User } from "../components/user/User";

export const UserPage = () => {
  return (
    <div>
      <Navbar />
      <User />
      <Menu />
    </div>
  );
};
