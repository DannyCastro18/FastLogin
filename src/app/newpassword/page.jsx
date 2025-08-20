"use client";

import React from "react";
import NewPassword from "@/components/NewPassword";
import LoginCarousel from "@/components/Carousel";

export default function NewPasswordPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fondo con carrusel */}
      <LoginCarousel hideForm />

      {/* Formulario posicionado a la izquierda */}
      <div className="absolute top-1/2 left-8 lg:left-16 transform -translate-y-1/2 z-20">
        <NewPassword />
      </div>
    </div>
  );
}