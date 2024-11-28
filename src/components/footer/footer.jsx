import React from "react";
import { Link } from "react-router-dom";
import { FaBullseye, FaHome, FaRegLightbulb, FaTrophy } from "react-icons/fa";


const Footer = () => {
  return (
    <div className="footer">
      <div className="nav-menu">
        <Link to="/" className="link-nav-menu">
          <div className="icon-text-container">
            <FaHome className="icon" />
            <span>Home</span>
          </div>
        </Link>
      </div>
      <div className="nav-menu">
        <Link to="/prediction" className="link-nav-menu">
          <div className="icon-text-container">
            <FaBullseye className="icon" />
            <span>Predictions</span>
          </div>
        </Link>
      </div>
      <div className="nav-menu">
        <Link to="/quiz" className="link-nav-menu">
          <div className="icon-text-container">
            <FaRegLightbulb className="icon" />
            <span>Quiz</span>
          </div>
        </Link>
      </div>
      <div className="nav-menu">
        <Link to="/table" className="link-nav-menu">
          <div className="icon-text-container">
            <FaTrophy className="icon" />
            <span>Table</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
