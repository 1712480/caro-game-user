import { USER_ROLE } from './constant';

export const parseGoogleAccountData = (response) => {
  const { email, imageUrl, googleId, name, accessToken } = response.profileObj;
  return {
    user: {
      email,
      role: USER_ROLE.NORMAL_USER,
      fullName: name,
      imageUrl,
      googleId,
    },
    access_token: accessToken,
    isAuthenticated: true,
  };
};
