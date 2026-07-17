import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../components/ProfileHeader';
import GameCard from '../components/GameCard';
import { getUserProfile } from '../utils/api';
import type { UserProfile, Game } from '../types';

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;

    const fetchProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await getUserProfile(username);

        setUser({
          // TODO, when the result returns the username, use that instead of the url incase of capitalization differences or uuid
          // username: result.data.username,
          username: username,
          displayName: result.data.displayName,
          bio: result.data.biography ?? "",
          pfp: result.data.profileImage ?? "",
        });

        const loadedGames: Game[] = (result.data.createdGames ?? []).map((game: any) => ({
          gameProfileUUID: game.gameProfileUUID,
          title: game.title,
          dev: result.data.displayName,
          tags: [game.genre],
          image: game.profileImage ?? "",
          banner: "",
          description: game.description,
          data: {
            fileUUID: game.fileUUID,
          },
        }));

        setGames(loadedGames);
      } catch (err: any) {
        setError(err.error?.message ?? "Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <main className="content">
        <div className="profile-status">
          Loading profile...
        </div>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="content">
        <div className="profile-status-container">
          <div className="profile-status">
            {error || "Profile not found."}
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="profile-page">
      <ProfileHeader user={user} />

      <main className="content">
        <section className="section-group">
          <h2 className="section-title">
            Games by {user.displayName}
          </h2>

          {games.length > 0 ? (
            <div className="game-grid">
              {games.map(game => (
                <GameCard
                  key={game.gameProfileUUID}
                  game={game}
                />
              ))}
            </div>
          ) : (
            <p className="no-games">
              This user hasn't uploaded any games yet.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Profile;