// http://localhost:3001/ || 'https://caro-game-backend.herokuapp.com/'
export const API_HOST = 'https://caro-game-backend.herokuapp.com/';

export const API_END_POINT = {
  USER_CREATE: 'users/register',
  USER_LOGIN: 'users/login',
  USER_CHANGE_PASSWORD: 'users/info/password',
};

export const maxLength = 15;

export const ROUTE = {
  HOME: '/home',
  MATCH: '/match/[index]',
  LOGIN: '/',
  SIGN_UP: '/sign-up',
  HISTORY: '/history',
  HISTORY_ID: '/history/[id]',
};

export const SECURED_PATH = [ROUTE.HOME, ROUTE.MATCH, ROUTE.HISTORY, ROUTE.HISTORY_ID];
