import { useState, useEffect } from 'react';
import '../styles/Hero.css';
import Button from './UI/Button';

const Hero = ({ games }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % games.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [games.length]);

  const currentGame = games[index];

  return (
    <section className="hero" style={{ backgroundImage: `linear-gradient(to right, #0f0f0f, transparent), url(${currentGame.banner})` }}>
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