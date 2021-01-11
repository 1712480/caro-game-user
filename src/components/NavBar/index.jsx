import React from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Navbar as Nav, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { Image } from 'cloudinary-react';
import { useAuth } from '../AuthProvider/index';
import { AVATAR_LOCATION, ROUTE } from '../../utils/constant';
import { selectUser, logout } from '../../redux/userSlice';
import css from './css.module.scss';

const NavBar = (props) => {
  const { socket } = props;
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const ctaTitle = isAuthenticated ? 'Log out' : 'Sign up';

  const handleCta = async () => {
    if (user) {
      socket.emit('client-logout', user);
      dispatch(logout());
      await Router.push(ROUTE.LOGIN);
    } else {
      await Router.push(ROUTE.SIGN_UP);
    }
  };

  return (
    <Nav className={css.nav}>
      <Link className={css.link} href={ROUTE.HOME}>CARO</Link>
      {isAuthenticated
        ? (
          <UncontrolledDropdown className={css.dropdown} nav inNavbar>
            <DropdownToggle className={css.toggle} nav caret>
              <Image className={css.avatar} alt="avatar" publicId={`${AVATAR_LOCATION}/default`} />
            </DropdownToggle>
            <DropdownMenu right>
              <Link href={ROUTE.USER}>
                <DropdownItem className={css.item}>
                  {`${user?.user?.fullName}`}
                </DropdownItem>
              </Link>
              <Link href={ROUTE.HISTORY}>
                <DropdownItem className={css.item}>
                  History
                </DropdownItem>
              </Link>
              <DropdownItem divider />
              <DropdownItem className={css.item} onClick={handleCta}>
                {ctaTitle}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )
        : (
          <NavLink className={css.signUp} onClick={handleCta}>
            {ctaTitle}
          </NavLink>
        )}
    </Nav>
  );
};

export default NavBar;
