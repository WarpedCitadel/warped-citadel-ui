export interface Game {
  id: number;
  title: string;
  dev: string;
  tags: string[];
  image: string;
  banner: string;
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
  response: string;
  instance: string;
  timestamp: string;
}
