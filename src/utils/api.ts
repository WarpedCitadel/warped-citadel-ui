import type { SignupRequest, SignupResponse, LoginRequest, LoginResponse } from '../types';


//signup api request
export const signupUser = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await fetch("/api/auth/signup", {
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
  const response = await fetch(`/api/auth/login`, {
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