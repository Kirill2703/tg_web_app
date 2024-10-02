import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="border-nav-menu">
        <Link to="/prediction" className="btn-nav-menu">Прогнозы</Link>
      </div>
      <div className="border-nav-menu">
          <Link to="/quiz" className="nav-menu">Викторина</Link>
      </div>
      <div className="border-nav-menu">
        <Link to="/" className="nav-menu">Главный экран</Link>
      </div>
      <div className="border-nav-menu">
        <Link to="/table" className="nav-menu">Таблица</Link>
      </div>
    </div>
  );
};

export default Footer;
