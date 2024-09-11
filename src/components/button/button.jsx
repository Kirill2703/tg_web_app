import React from 'react';

const Button = (props) => {
    return (
        <button {...props} className={'button' + props.className}>
            
        </button>
    );
}

export default Button;
