import type { SignupRequest, SignupResponse, LoginRequest, LoginResponse } from '../types';

const API_BASE_URL = 'http://localhost:8080';

//signup api request
export const signupUser = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log("Signup API Response:", result);

  if (!response.ok) {
    throw result;
  }

  return result as SignupResponse;
};

//login api request
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) throw result;
  return result as LoginResponse;
};