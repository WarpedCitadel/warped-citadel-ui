import type { SignupRequest, SignupResponse, LoginRequest, LoginResponse, GameProfileResponse, GamesPageParams } from '../types';

const API_BASE_URL = 'http://localhost:8083';
const USER_MANAGEMENT_URL = 'http://localhost:8080';
const CONTENT_MANAGEMENT_URL = 'http://localhost:8082';

//signup api request
export const signupUser = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
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
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
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

//verify email api request
export const activateAccount = async (token: string, passcode: string) => {
    const response = await fetch(
        `${API_BASE_URL}/api/auth/activate`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "x-api-version": "1.0",
            },
            body: JSON.stringify({
                token,
                passcode
            })
        }
    );

    const result = await response.json();

    if (!response.ok)
        throw result;

    return result;
};

//resend passcode api request
export const resendPasscode = async (
    email: string
) => {

    const response = await fetch(
        `${API_BASE_URL}/api/auth/activate/resend`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "x-api-version":"1.0",
            },
            body:JSON.stringify({
                email
            })
        }
    );

    const result = await response.json();

    if(!response.ok)
        throw result;

    return result;
}

export const getUserProfile = async (username: string) => {
  const response = await fetch(
    `${USER_MANAGEMENT_URL}/api/user/profile/${username}`,
    {
      method: "GET",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "x-api-version":"1.0",
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
};

export const getTrendingGames = async () => {
  const response = await fetch(
    `${CONTENT_MANAGEMENT_URL}/api/main/GetTrendingGames`,
    {
      method: "GET",
      headers: {
        "Content-Type":"application/json",
        "Accept": "application/json",
        "x-api-version": "1.0",
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
};

export const getGamesPage = async (
  params: GamesPageParams = {}
) => {
  const queryParams = new URLSearchParams();

  if (params.title) {
    queryParams.append("title", params.title);
  }

  if (params.genre !== undefined) {
    queryParams.append("genre", params.genre.toString());
  }

  if (params.platformOS !== undefined) {
    queryParams.append("platformOS", params.platformOS.toString());
  }

  if (params.mostRecent !== undefined) {
    queryParams.append("mostRecent", params.mostRecent.toString());
  }

  queryParams.append(
    "page",
    (params.page ?? 0).toString()
  );

  queryParams.append(
    "size",
    (params.size ?? 24).toString()
  );

  if (params.gameType !== undefined) {
    queryParams.append("gameType", params.gameType.toString());
  }

  const response = await fetch(
    `${CONTENT_MANAGEMENT_URL}/api/main/GetTrendingGames?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "x-api-version": "1.0",
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
};

export const getGameProfile = async (uuid: string): Promise<GameProfileResponse> => {
  const response = await fetch(
    `${CONTENT_MANAGEMENT_URL}/api/game/getGameProfile/${uuid}`, // Added /api/game/
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-api-version": "1.0", // This is likely what was causing the 403
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result as GameProfileResponse;
};