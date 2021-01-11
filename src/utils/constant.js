// http://localhost:3001/ || 'https://caro-game-backend.herokuapp.com/'
export const API_HOST = 'https://caro-game-backend.herokuapp.com/';

export const API_END_POINT = {
  USER_CREATE: 'users/register',
  USER_LOGIN: 'users/login',
  USER_CHANGE_PASSWORD: 'users/info/password',
  CHECK_OTP: 'users/check-otp',
  RESEND_OTP: 'users/resend-otp',
  CHANGE_NAME: 'users/info/fullname',
  MY_HISTORY: 'matches/my',
};

export const maxLength = 15;

export const ROUTE = {
  HOME: '/home',
  MATCH: '/match/[index]',
  LOGIN: '/',
  SIGN_UP: '/sign-up',
  HISTORY: '/history',
  HISTORY_ID: '/history/[id]',
  ACTIVATE_ACCOUNT: '/activate-account',
  FORGOT_PASSWORD: '/forgot-password',
  USER: '/user',
};

export const GOOGLE_CLIENT_ID = '826449134729-2qc7bpdrf0htl70mf0ovbfh1cedav52k.apps.googleusercontent.com';

export const SECURED_PATH = [ROUTE.HOME, ROUTE.MATCH, ROUTE.HISTORY, ROUTE.HISTORY_ID, ROUTE.USER];

export const AVATAR_LOCATION = 'caro';
