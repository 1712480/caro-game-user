import React from 'react';
import styles from './styles.module.scss';

function Searching() {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinner1}>
        <span>Searching...</span>
      </div>
    </div>
  );
}

export default Searching;
