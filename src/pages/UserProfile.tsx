import React from 'react';
import ProfileHeader from '../components/ProfileHeader';
import GameCard from '../components/GameCard';
import type { UserProfile, Game } from '../types';

// Mock Data for the Profile
const MOCK_USER: UserProfile = {
  username: "TestUser",
  displayName: "Kaden",
  bio: "Indie dev focused on high-speed synthwave aesthetics and rogue-like mechanics. Building the future of the WarpedCitadel.",
  pfp: "https://picsum.photos/seed/user/200/200",
};

// Mock Data for User's Games
const USER_GAMES: Game[] = [
  { id: 1, title: "Neon Drifter", dev: "TestUser", tags: ["Action"], image: "https://picsum.photos/seed/1/400/250", banner: "", description: "" },
  { id: 4, title: "Citadel Siege", dev: "TestUser", tags: ["Strategy"], image: "https://picsum.photos/seed/12/400/250", banner: "", description: "" },
];

const Profile: React.FC = () => {
  return (
    <div className="profile-page">
      <ProfileHeader user={MOCK_USER} />
      
      <main className="content">
        <section className="section-group">
          <h2 className="section-title">Games by {MOCK_USER.displayName}</h2>
          
          {USER_GAMES.length > 0 ? (
            <div className="game-grid">
              {USER_GAMES.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <p className="no-games">This user hasn't uploaded any games yet.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Profile;