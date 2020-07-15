import React from 'react';

import styles from './Loader.module.scss';

const { content, planet, ring, coverRing, spots } = styles;

export const Loader = () => (
  <div className={content}>
    <div className={planet}>
      <div className={ring}/>
      <div className={coverRing}/>
      <div className={spots}>
        <span/>
        <span/>
        <span/>
        <span/>
        <span/>
        <span/>
        <span/>
      </div>
    </div>
    <p>loading</p>
  </div>
);
