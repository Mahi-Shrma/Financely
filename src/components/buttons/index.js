import React from 'react';
import './style.css';

function Button({text,blue,onClick,disabled}) {
  return (
    <div className={blue ?"btn btn-blue" : "btn"} onClick={onClick} disabled={disabled}>
        {text}
    </div>
  )
}

export default Button;