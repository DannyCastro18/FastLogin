"use client";

import React from "react";

const ButtonSecondary = ({ 
  label, 
  onClick, 
  className = "", 
  type = "button" 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex-1 w-full flex items-center justify-center font-semibold text-white text-center transition-all duration-300 hover:translate-y-[-2px] ${className}`}
      style={{
        padding: '12px 24px', 
        borderRadius: '12px',
        border: '1px solid transparent', 
        boxSizing: 'border-box',
        backgroundColor: "#0A84FF", 
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        letterSpacing: 'normal',
        textTransform: 'none',
        fontSize: 'inherit',
        minHeight: '48px' 
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(10, 132, 255, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
      }}
    >
      {label}
    </button>
  );
};

export default ButtonSecondary;