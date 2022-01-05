import React, { useState } from 'react';

import styles from './Loader.module.scss';

export const Loader = () => {
  const [spinnerInnerMarkup] = useState(
    Array.from(Array(7), (_, i) => <span key={i} />)
  );

  return (
    <div className={styles.content}>
      <div className={styles.planet}>
        <div className={styles.ring} />
        <div className={styles.coverRing} />
        <div className={styles.spots}>{spinnerInnerMarkup}</div>
      </div>
      <p>loading</p>
    </div>
  );
};
