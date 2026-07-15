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
          username: result.data.username,
          displayName: result.data.displayName,
          bio: result.data.biography ?? "",
          pfp: result.data.profileImgUUID ?? "",
        });

        const loadedGames: Game[] = (result.data.createdGames ?? []).map((game: any) => ({
          uuid: game.fileUUID,
          title: game.title,
          dev: result.data.displayName,
          tags: [game.genre],
          image: game.coverImgUUID ?? "",
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
    return <div className="content">Loading profile...</div>;
  }

  if (error || !user) {
    return <div className="content">{error || "Profile not found."}</div>;
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
                  key={game.uuid}
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