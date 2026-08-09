export interface GameCardData {
  gameProfileUUID: string;
  title: string;
  dev: string;
  tags: string[];
  image: string;
  banner: string;
  data: {
    fileUUID: string;
  }
  description: string;
}

export interface SignupRequest {
  username: string;
  password: string;
  email: string;
}

export interface SignupResponse {
  title: string;
  status: number;
  data: {
    email: string;
    sessionToken: string;
  };
  instance: string;
  timestamp: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  title: string;
  status: number;
  headers: Headers;
  data: {
    userUUID: string;
    username: string;
  };
  instance: string;
  timestamp: string;
}

export interface UserProfile {
  username: string;
  displayName: string;
  bio: string;
  pfp: string;
}

//GAME PROFILE PAGE

export interface GameFile {
  filename: string;
  platformOS: number;
  fileURL: string;
}

export interface GameProfileData {
  gameProfileUUID: string;
  title: string;
  description: string;
  genreType: string;
  gameType: string;
  platformOS: string[];
  createdDtm: string;
  images: {
    coverImages: string;
    gameImages: string[];
  };
  gameFiles: {
    browserGameURL?: string;
    files: GameFile[];
  };
  displayName: string;
  userUUID: string;
}

export interface GameProfileResponse {
  title: string;
  status: number;
  data: GameProfileData;
  instance: string;
  timestamp: string;
}

export interface GamesPageParams {
  title?: string;
  genre?: number;
  platformOS?: number;
  mostRecent?: number;
  gameType?: number;
  page?: number;
  size?: number;
}