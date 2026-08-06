import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGameProfile } from '../utils/api';
import type { GameProfileData } from '../types';
import Button from '../components/UI/Button';
import { FaWindows, FaLinux, FaApple, FaGlobe } from "react-icons/fa6"; 
import type { IconType } from "react-icons";
import '../styles/GameProfile.css';

// Platform lookup table
const PLATFORM_ICONS: Record<string, IconType> = {
  W: FaWindows,
  L: FaLinux,
  M: FaApple,
  B: FaGlobe,
};

const GameProfile: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [game, setGame] = useState<GameProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uuid) return;

    setLoading(true);
    getGameProfile(uuid)
      .then((res) => {
        if (res && res.data) {
          setGame(res.data);
        } else {
          setError("Game data structure is invalid.");
        }
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError(err.response || "Failed to connect to the Citadel.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [uuid]);

  if (loading) {
    return (
      <div className="game-profile-container">
        <div className="error-pill">
          Loading game...
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="game-profile-container">
        <div className="error-pill">
          {error || 'Game profile not found.'}
        </div>
      </div>
    );
  }

  return (
    <div className="game-profile-container">
      {/* 1. Playable Section */}
      {game.gameType === "HTML5" && game.gameFiles?.browserGameURL ? (
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
        // 2. Downloadable Showcase Section
        <section
          className="game-showcase"
          style={
            {
              '--showcase-image': `url(${game.images?.coverImages})`,
            } as React.CSSProperties
          }
        >
          <div className="game-showcase-content">
            <div className="game-showcase-cover">
              <img src={game.images?.coverImages} alt={game.title} />
            </div>

            <div className="game-showcase-info">
              <h1>{game.title}</h1>

              <p className="game-showcase-dev">
                By <Link to={`/user/${game.userUUID}`}>{game.displayName}</Link>
              </p>

              <p className="game-showcase-description">
                {game.description}
              </p>

              <div className="game-showcase-actions">
                {game.gameFiles?.files?.[0] && (
                  <a
                    href={game.gameFiles.files[0].fileURL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button>Download</Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <main className="game-content">
        <div className="game-main">
          <section className="screenshots-section">
            <h2>Images</h2>

            {game.images?.gameImages?.length ? (
              <div className="screenshots-grid">
                {game.images.gameImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${game.title} screenshot ${idx + 1}`}
                  />
                ))}
              </div>
            ) : (
              <p className="empty-gallery">No screenshots available.</p>
            )}
          </section>
        </div>

        <aside className="game-sidebar">
          <div className="sidebar-card">
            <h3>Game Information</h3>

            <div className="meta-item">
              <span>Genre</span>
              <span className="teal-text">{game.genreType}</span>
            </div>

            <div className="meta-item">
              <span>Platform</span>

              <span className="platform-icons">
                {game.platformOS?.map((platform) => {
                  const Icon = PLATFORM_ICONS[platform];
                  return Icon ? <Icon key={platform} /> : null;
                })}
              </span>
            </div>

            <div className="meta-item">
              <span>Released</span>
              <span>
                {game.createdDtm
                  ? new Date(game.createdDtm).toLocaleDateString()
                  : 'N/A'}
              </span>
            </div>

            <div className="meta-item">
              <span>Type</span>
              <span>{game.gameType}</span>
            </div>
          </div>

          {game.gameFiles?.files?.length ? (
            <div className="sidebar-card">
              <h3>Downloads</h3>

              <div className="download-list">
                {game.gameFiles.files.map((file, idx) => (
                  <a
                    key={idx}
                    href={file.fileURL}
                    className="download-item"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button variant="secondary">
                      {file.filename.split('-').pop()?.split('.')[0] ||
                        'Download'}
                    </Button>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </main>
    </div>
  );
};

export default GameProfile;