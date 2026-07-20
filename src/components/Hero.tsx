import React, { useState, useEffect } from 'react';
import type { Game } from '../types';
import '../styles/Hero.css';
import Button from './UI/Button';

interface HeroProps {
  games: Game[];
}

const Hero: React.FC<HeroProps> = ({ games }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (games.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % games.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [games.length]);

  if (games.length === 0) {
    return <section className="hero-empty">No featured games found.</section>;
  }

  const currentGame = games[index];

  return (
    // <section 
    //   className="hero" 
    //   style={{ 
    //     backgroundImage: `linear-gradient(to right, #0f0f0f, transparent), url(${currentGame.image})` 
    //   }}
    // >
    <section
      className="hero"
      style={
        {
          "--hero-image": `url(${currentGame.image})`,
        } as React.CSSProperties
      }
    >
      <div className="hero-content">
        <span className="trending-badge">TRENDING NOW</span>
        <h1>{currentGame.title}</h1>
        <p>{currentGame.description}</p>
        <Button>Play Now</Button>
      </div>
    </section>
  );
};

export default Hero;