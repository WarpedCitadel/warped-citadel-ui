import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import GameCard from '../components/GameCard';
import { getTrendingGames } from '../utils/api';
import type { GameCardData } from '../types';
import '../styles/Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [games, setGames] = useState<GameCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGames = async () => {
      try {
        const result = await getTrendingGames();

        const loadedGames: GameCardData[] =
          result.data.listGames.content.map((game: any) => ({
            id: game.gameProfileUUID,
            gameProfileUUID: game.gameProfileUUID,
            title: game.title,
            dev: "",
            tags: game.genre ? [game.genre] : [],
            image: game.coverImage,
            banner: "",
            description: game.shortDesc,
            data: {
              fileUUID: game.gameProfileUUID,
            },
          }));

        setGames(loadedGames);
      } catch (err: any) {
        setError(err.error?.message ?? "Unable to load games.");
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  if (loading) {
    return (
      <div className="home-status">
        <div className="error-pill">
          Loading games...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-status">
        <div className="error-pill">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Hero games={games} />

      <main className="content">

        {/* =========================
            POPULAR GAMES
            ========================= */}

        <section className="section-group">

          <div className="section-header">
            <h2 className="section-title">
              Popular Games
            </h2>

            <button
              className="view-more-button"
              onClick={() => navigate("/games?sort=trending")}
            >
              View More
            </button>
          </div>

          <div className="game-grid">
            {games.slice(0, 5).map((game) => (
              <GameCard
                key={game.gameProfileUUID}
                game={game}
              />
            ))}
          </div>

        </section>


        {/* =========================
            RECENTLY ADDED
            ========================= */}

        <section className="section-group">

          <div className="section-header">
            <h2 className="section-title">
              Recently Added
            </h2>

            <button
              className="view-more-button"
              onClick={() => navigate("/games?sort=newest")}
            >
              View More
            </button>
          </div>

          <div className="game-grid">
            {[...games]
              .reverse()
              .slice(0, 5)
              .map((game) => (
                <GameCard
                  key={game.gameProfileUUID}
                  game={game}
                />
              ))}
          </div>

        </section>

      </main>
    </div>
  );
};

export default Home;