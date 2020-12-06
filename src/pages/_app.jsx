import React from 'react';
import { toast } from 'react-toastify';
import { Provider } from 'react-redux';
import axios from 'axios';

import NavBar from '../components/NavBar';

import { store } from '../redux/store';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import css from './_app.module.scss';

toast.configure();
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const MyApp = ({ Component, pageProps }) => (
  <Provider store={store}>
    <div className={css.container}>
      <NavBar />
      <div className={css.content}>
        <Component {...pageProps} />
      </div>
      <div className={css.footer}>1712267 - 1712480 - 1712512</div>
    </div>
  </Provider>
);

export default MyApp;
