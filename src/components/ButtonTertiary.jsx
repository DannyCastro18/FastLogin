"use client";

import React from "react";

const ButtonTertiary = ({ children, onClick, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex-1 w-full flex items-center justify-center font-semibold text-white text-center transition-all duration-300 hover:translate-y-[-2px] ${className}`}
      style={{
        padding: '12px 24px', // py-3 px-6 equivalente
        borderRadius: '12px', // rounded-xl equivalente
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxSizing: 'border-box', // incluye border en el tamaño total
        backgroundColor: "transparent",
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        letterSpacing: 'normal',
        textTransform: 'none',
        fontSize: 'inherit',
        minHeight: '48px' // altura mínima fija
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        e.currentTarget.style.color = "#374151";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "white";
      }}
    >
      {children}
    </button>
  );
};

export default ButtonTertiary;