import React from 'react';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import css from './_app.module.scss';

const MyApp = ({ Component, pageProps }) => (
  <Container className={css.container}>
    <Component {...pageProps} />
  </Container>
);

export default MyApp;
