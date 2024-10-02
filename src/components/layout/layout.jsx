import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";

const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
