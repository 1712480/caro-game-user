import React from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { Navbar as Nav, NavLink } from 'reactstrap';
import { selectUser, logout } from '../../redux/userSlice';

import css from './css.module.scss';

const NavBar = (props) => {
  const { socket } = props;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const ctaTitle = user ? 'Log out' : 'Sign up';

  const handleCta = async () => {
    if (user) {
      socket.emit('client-logout', user);
      dispatch(logout());
      await Router.push('/');
    } else {
      await Router.push('/sign-up');
    }
  };

  return (
    <Nav className={css.nav}>
      <Link className={css.link} href="/">CARO</Link>
      <NavLink className={css.link} onClick={handleCta}>{ctaTitle}</NavLink>
    </Nav>
  );
};

export default NavBar;
