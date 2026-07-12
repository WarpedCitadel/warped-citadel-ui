import React from 'react';
import type { UserProfile } from '../types';
import '../styles/Profile.css';

interface ProfileHeaderProps {
  user: UserProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="profile-header">
      
      <div className="profile-info-container">
        <div className="pfp-wrapper">
          <img src={user.pfp} alt={user.displayName} className="profile-pfp" />
        </div>
        
        <div className="profile-text">
          <h1 className="display-name">{user.displayName}</h1>
          <p className="username">@{user.username}</p>
          <p className="bio">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;