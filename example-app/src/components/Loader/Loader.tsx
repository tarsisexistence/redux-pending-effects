import React, { useMemo } from 'react';

import { content, planet, ring, coverRing, spots } from './Loader.module.scss';

export const Loader = () => (
  <div className={content}>
    <div className={planet}>
      <div className={ring}/>
      <div className={coverRing}/>
      <div className={spots}>
        {
          useMemo(
          () => Array(7).fill(<span/>),
          []
          )
        }
      </div>
    </div>
    <p>loading</p>
  </div>
);
