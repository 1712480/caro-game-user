import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Navbar as Nav, NavbarBrand, NavLink } from 'reactstrap';
import { selectUser, logout } from '../../redux/userSlice';

import css from './css.module.scss';

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <Nav className={css.nav}>
      <NavbarBrand className={css.link} href="/">CARO</NavbarBrand>
      {!user ? <NavLink className={css.link} href="/sign-up">Sign Up</NavLink>
        : <NavLink className={css.link} onClick={() => dispatch(logout())}>Log out</NavLink>}
    </Nav>
  );
};

export default NavBar;
