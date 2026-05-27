import Hero from '../components/Hero';
import GameCard from '../components/GameCard';

const MOCK_GAMES = [
  { id: 1, title: "Neon Drifter", dev: "CyberPunk Studio", tags: ["Action", "Indie"], image: "https://picsum.photos/seed/1/400/250", banner: "https://picsum.photos/seed/1/1200/600", description: "A high-octane racer set in a dystopian future." },
  { id: 2, title: "Void Crawler", dev: "Abyss Games", tags: ["RPG", "Rogue-like"], image: "https://picsum.photos/seed/2/400/250", banner: "https://picsum.photos/seed/2/1200/600", description: "Explore the endless depths of the digital void." },
  { id: 3, title: "Pixel Siege", dev: "Retro-Fit", tags: ["Strategy"], image: "https://picsum.photos/seed/3/400/250", banner: "https://picsum.photos/seed/3/1200/600", description: "Defend your citadel against 8-bit invaders." },
];

const Home = ({ setPage }) => {
  return (
    <div className="app-container">
      <Hero games={MOCK_GAMES} />
      
      <main className="content">
        <section className="section-group">
          <h2 className="section-title">Popular Games</h2>
          <div className="game-grid">
            {MOCK_GAMES.map(game => <GameCard key={game.id} game={game} />)}
          </div>
        </section>

        <section className="section-group">
          <h2 className="section-title">Rising Projects</h2>
          <div className="game-grid">
            {[...MOCK_GAMES].reverse().map(game => <GameCard key={game.id} game={game} />)}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;