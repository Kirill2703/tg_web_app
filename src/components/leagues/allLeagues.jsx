import React from 'react';
import { Link } from 'react-router-dom';

const AllLeagues = () => {
    return (
      <div>
        <Link to="/prediction/england">England</Link>
        <Link to="/prediction/germany">Germany</Link>
        <Link to="/prediction/spain">Spain</Link>
        <Link to="/prediction/italy">Italy</Link>
        <Link to="/prediction/france">France</Link>
      </div>
    );
}

export default AllLeagues;
