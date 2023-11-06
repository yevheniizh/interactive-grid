import React from 'react';

import { useAppContext } from '../App/appContext';

import { Tile } from '../Tile/Tile';

import './Canvas.css';

export const Canvas = () => {
  const { urls, removeUrl } = useAppContext();

  const onRemove = (ID) => {
    urls.find(({ id }) => id === ID) && removeUrl(ID);
  }

  return (
    <div className="canvas-wrapper">
      <div className="canvas">
        {urls.map(({ id, url }) => (
          <Tile key={id} id={id} url={url} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};
