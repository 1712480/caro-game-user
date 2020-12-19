import React from 'react';
import { Spinner } from 'reactstrap';
import { useAuth } from '../../components/AuthProvider';
import css from './history.module.scss';

const History = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Spinner className={css.spinner} />;
  }
  return (<div>History detail</div>);
};

export default History;
