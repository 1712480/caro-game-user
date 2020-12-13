import React from 'react';
import { toast } from 'react-toastify';
import { Provider } from 'react-redux';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

import NavBar from '../components/NavBar';
import { store } from '../redux/store';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import css from './_app.module.scss';

toast.configure();
// axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

// https://caro-game-backend.herokuapp.com || http://localhost:3001
const socket = socketIOClient('http://localhost:3001');

const MyApp = ({ Component, pageProps }) => (
  <Provider store={store}>
    <div className={css.container}>
      <NavBar socket={socket} />
      <div className={css.content}>
        <Component {...pageProps} socket={socket} />
      </div>
      <div className={css.footer}>1712267 - 1712480 - 1712512</div>
    </div>
  </Provider>
);

export default MyApp;
