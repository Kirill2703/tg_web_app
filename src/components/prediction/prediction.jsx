import React from 'react';
import AllLeagues from '../leagues/allLeagues';

const Prediction = () => {
    return (
        <div style={{margin: "0 20px"}}>
            <h2 className='title-prediction'>Choose league:</h2>
            <AllLeagues />
        </div>
    );
}

export default Prediction;
