import React, { useState } from 'react';

import { content, planet, ring, coverRing, spots } from './Loader.module.scss';

export const Loader = () => {
  const [spinnerInnerMarkup] = useState(Array(7).fill(<span/>));

  return (
    <div className={content}>
      <div className={planet}>
        <div className={ring}/>
        <div className={coverRing}/>
        <div className={spots}>
          { spinnerInnerMarkup }
        </div>
      </div>
      <p>loading</p>
    </div>
  );
};
