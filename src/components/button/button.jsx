// src/components/Button.js

import React from "react";

const Button = ({ userName, ...props }) => {
  return (
    <div>
      <button {...props} className="button"></button>
      {userName && <p className="user-name">{userName}</p>}{" "}
      {/* Отображаем имя пользователя */}
    </div>
  );
};

export default Button;
