import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="nav-menu">
        <Link to="/prediction" className="link-nav-menu">Прогнозы</Link>
      </div>
      <div className="nav-menu">
          <Link to="/quiz" className="link-nav-menu">Викторина</Link>
      </div>
      <div className="nav-menu">
        <Link to="/" className="link-nav-menu">Главный экран</Link>
      </div>
      <div className="nav-menu">
        <Link to="/table" className="link-nav-menu">Таблица</Link>
      </div>
    </div>
  );
};

export default Footer;
