'use client';
import { useState, useEffect } from 'react';

const LoginCarousel = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, bgImage: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 2, bgImage: 'https://images.pexels.com/photos/50713/football-ball-sport-soccer-50713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 3, bgImage: 'https://images.pexels.com/photos/47354/the-ball-stadion-football-the-pitch-47354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 4, bgImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1260&auto=format&fit=crop&ixlib=rb-4.1.0' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${slide.bgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}

      {/* Overlay negro un poco más oscuro */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Contenido encima del overlay */}
      <div className="absolute top-1/2 left-8 lg:left-16 transform -translate-y-1/2 z-20">
        {children}
      </div>
    </div>
  );
};

export default LoginCarousel;
