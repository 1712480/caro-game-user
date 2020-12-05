import React from 'react';

import { Navbar as Nav, NavbarBrand, NavLink } from 'reactstrap';

import css from './css.module.scss';

const NavBar = () => (
  <Nav className={css.nav}>
    <NavbarBrand className={css.link} href="/">1712480</NavbarBrand>
    <NavLink className={css.link} href="/sign-up">Sign Up</NavLink>
  </Nav>
);

export default NavBar;
