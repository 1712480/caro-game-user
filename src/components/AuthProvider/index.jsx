import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { selectUser } from '../../redux/userSlice';
import { SECURED_PATH, ROUTE } from '../../utils/constant';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const user = useSelector(selectUser);
  const { pathname, events, push } = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(user?.isAuthenticated);
  }, [user]);

  const redirectToLoginPage = () => {
    push(ROUTE.LOGIN);
  };

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (SECURED_PATH.includes(url) && !user) {
        redirectToLoginPage();
      }
    };

    if (SECURED_PATH.includes(pathname) && !user) {
      redirectToLoginPage();
    }

    events.on('routeChangeStart', handleRouteChange);

    return () => events.off('routeChangeStart', handleRouteChange);
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
