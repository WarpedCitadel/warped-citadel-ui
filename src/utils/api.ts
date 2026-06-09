import type { SignupRequest, SignupResponse } from '../types';

const API_BASE_URL = 'http://localhost:8080';

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