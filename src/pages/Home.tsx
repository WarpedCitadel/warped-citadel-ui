import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import GameCard from '../components/GameCard';
import { getTrendingGames } from '../utils/api';
import type { Game } from '../types';

const Home: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGames = async () => {
      try {
        const result = await getTrendingGames();

        const loadedGames: Game[] = result.data.listGames.content.map((game: any) => ({
          uuid: game.gameProfileUUID,
          gameProfileUUID: game.gameProfileUUID, // if your GameCard expects this
          title: game.title,
          dev: "",
          tags: [game.genre],
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
      <div className="home-container">
        <main className="content">
          <p>Loading games...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <main className="content">
          <p>{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="home-container">
      <Hero games={games} />

      <main className="content">
        <section className="section-group">
          <h2 className="section-title">Popular Games</h2>

          <div className="game-grid">
            {games.slice(0, 3).map((game) => (
              <GameCard
                key={game.gameProfileUUID}
                game={game}
              />
            ))}
          </div>
        </section>

        <section className="section-group">
          <h2 className="section-title">Recently Added</h2>

          <div className="game-grid">
            {[...games].reverse().slice(0, 3).map((game) => (
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