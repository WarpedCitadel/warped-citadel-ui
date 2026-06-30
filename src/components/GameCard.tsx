import React from "react";
import { useNavigate } from "react-router-dom";
import type { Game } from "../types";
import "../styles/GameCard.css";

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const navigate = useNavigate();

  return (
    <div
      className="game-card"
      onClick={() => navigate(`/gameProfile/${game.title}`)}
      style={{ cursor: "pointer" }}
    >
      <div
        className="card-img"
        style={{ backgroundImage: `url(${game.image})` }}
      />
      <div className="card-info">
        <h3>{game.title}</h3>
        <p>{game.dev}</p>
        <div className="card-tags">
          {game.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCard;