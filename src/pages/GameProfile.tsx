import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGameProfile } from '../utils/api';
import type { GameProfileData } from '../types';
import Button from '../components/UI/Button';
import '../styles/GameProfile.css';

const GameProfile: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [game, setGame] = useState<GameProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uuid) return;

    getGameProfile(uuid)
      .then((res) => {
        setGame(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [uuid]);

  if (loading) return <div className="loading-screen">Synchronizing with Citadel...</div>;
  if (error || !game) return <div className="error-screen">Error: {error || 'Game not found'}</div>;

  return (
    <div className="game-profile-container">
      {/* 1. Playable Section */}
      {game.gameType === "HTML5" && game.gameFiles.browserGameURL ? (
        <section className="game-player-section">
          <div className="iframe-wrapper">
            <iframe
              src={game.gameFiles.browserGameURL}
              title={game.title}
              allowFullScreen
            />
          </div>
        </section>
      ) : (
        <div className="game-banner-fallback" style={{ backgroundImage: `url(${game.gameImages.coverImages})` }}>
          <div className="banner-overlay">
            <h1>{game.title}</h1>
            <p>This game is available for download below.</p>
          </div>
        </div>
      )}

      {/* 2. Content Section */}
      <main className="game-details-layout">
        <div className="game-main-info">
          <div className="header-row">
            <h1>{game.title}</h1>
            <p className="dev-name">By <Link to={`/profile/${game.userUUID}`}>{game.displayName}</Link></p>
          </div>

          <p className="game-description">{game.description}</p>

          <div className="screenshot-gallery">
            <h3>Screenshots</h3>
            <div className="gallery-grid">
              {game.gameImages.gameImages.map((img, idx) => (
                <img key={idx} src={img} alt={`${game.title} screenshot ${idx}`} />
              ))}
            </div>
          </div>
        </div>

        {/* 3. Sidebar */}
        <aside className="game-sidebar">
          <div className="sidebar-card">
            <h3>Downloads</h3>
            <div className="download-list">
              {game.gameFiles.files.map((file, idx) => (
                <a key={idx} href={file.fileURL} className="download-item">
                  <Button variant="secondary">Download for {file.filename.split('-').pop()?.split('.')[0]}</Button>
                </a>
              ))}
            </div>
          </div>

          <div className="sidebar-card metadata">
            <div className="meta-item">
              <span>Genre</span>
              <span className="teal-text">{game.genreType}</span>
            </div>
            <div className="meta-item">
              <span>Platform</span>
              <span className="teal-text">{game.platformOS.join(', ')}</span>
            </div>
            <div className="meta-item">
              <span>Released</span>
              <span>{new Date(game.createdDtm).toLocaleDateString()}</span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default GameProfile;