import React from "react";
import { Link } from "react-router-dom";

const AllLeagues = () => {
  return (
    <>
      <div className="container-leagues">
        <div className="league">
          <Link to="/prediction/england" className="league-title">
            <p>England</p>
            <img
              src={require("../../icons/england.svg").default}
              alt="England"
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className="league">
          <Link to="/prediction/germany" className="league-title">
            <p>Germany</p>
            <img
              src={require("../../icons/germany.svg").default}
              alt="Germany"
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className="league">
          <Link to="/prediction/spain" className="league-title">
            <p>Spain</p>
            <img
              src={require("../../icons/spain.svg").default}
              alt="Spain"
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className="league">
          <Link to="/prediction/italy" className="league-title">
            <p>Italy</p>
            <img
              src={require("../../icons/italy.svg").default}
              alt="Italy"
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className="league">
          <Link to="/prediction/france" className="league-title">
            <p>France</p>
            <img
              src={require("../../icons/france.svg").default}
              alt="France"
              width={40}
              height={40}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default AllLeagues;
