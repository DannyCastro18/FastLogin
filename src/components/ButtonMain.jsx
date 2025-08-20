"use client";

import React from "react";

const ButtonMain = ({ children, onClick = () => {}, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        flex-1 w-full flex items-center justify-center font-semibold text-white text-center
        shadow-lg btn-gradient-primary transition-all duration-300 hover:translate-y-[-2px]
        ${className}
      `}
      style={{
        padding: '12px 24px', 
        borderRadius: '12px', 
        border: '1px solid transparent', 
        boxSizing: 'border-box', 
        letterSpacing: 'normal',
        textTransform: 'none',
        fontSize: 'inherit',
        minHeight: '48px' 
      }}
    >
      {children}
    </button>
  );
};

export default ButtonMain;