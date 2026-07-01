import type { SignupRequest, SignupResponse, LoginRequest, LoginResponse } from '../types';

const API_BASE_URL = 'http://localhost:8080';

//signup api request
export const signupUser = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-version': '1.0',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log("Signup API Response:", result);  //testing

  if (!response.ok) {
    throw result;
  }

  return result as SignupResponse;
};

//login api request
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
       'x-api-version': '1.0',
      },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log("Login API Response:", result); //testing
  if (!response.ok) throw result;

  return {
    ...result,
    status: response.status,
    headers: response.headers,
  };
};