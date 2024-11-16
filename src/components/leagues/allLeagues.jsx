import React from "react";
import { Link } from "react-router-dom";

const AllLeagues = () => {
  return (
    <>
      <div className="container-leagues">
        <div className="league">
          <Link to="/prediction/ucl" className="league-title">
            <p>Champions League</p>
            <img
              src={require("../../icons/europe.svg").default}
              alt="Champions League"
              width={30}
              height={30}
            />
          </Link>
        </div>
        <div className="league">
          <Link to="/prediction/uel" className="league-title">
            <p>Europa League</p>
            <img
              src={require("../../icons/europe.svg").default}
              alt="Europa League"
              width={30}
              height={30}
            />
          </Link>
        </div>
        <div className="league">
          <Link to="/prediction/england" className="league-title">
            <p>Conference League</p>
            <img
              src={require("../../icons/europe.svg").default}
              alt="Conference League"
              width={30}
              height={30}
            />
          </Link>
        </div>
        <div className="league">
          <Link to="/prediction/england" className="league-title">
            <p>England</p>
            <img
              src={require("../../icons/england.svg").default}
              alt="England"
              width={30}
              height={30}
            />
          </Link>
        </div>
        <div className="league">
          <Link to="/prediction/germany" className="league-title">
            <p>Germany</p>
            <img
              src={require("../../icons/germany.svg").default}
              alt="Germany"
              width={30}
              height={30}
            />
          </Link>
        </div>
        <div className="league">
          <Link to="/prediction/spain" className="league-title">
            <p>Spain</p>
            <img
              src={require("../../icons/spain.svg").default}
              alt="Spain"
              width={30}
              height={30}
            />
          </Link>
        </div>
        <div className="league">
          <Link to="/prediction/italy" className="league-title">
            <p>Italy</p>
            <img
              src={require("../../icons/italy.svg").default}
              alt="Italy"
              width={30}
              height={30}
            />
          </Link>
        </div>
        <div className="league">
          <Link to="/prediction/france" className="league-title">
            <p>France</p>
            <img
              src={require("../../icons/france.svg").default}
              alt="France"
              width={30}
              height={30}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default AllLeagues;
