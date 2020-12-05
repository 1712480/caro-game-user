import React from 'react';

import NavBar from '../components/NavBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import css from './_app.module.scss';

const MyApp = ({ Component, pageProps }) => (
  <div className={css.container}>
    <NavBar />
    <div className={css.content}>
      <Component {...pageProps} />
    </div>
    <div className={css.footer}>1712267 - 1712480 - 1712512</div>
  </div>
);

export default MyApp;
