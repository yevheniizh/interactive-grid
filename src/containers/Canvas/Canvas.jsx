import React, { useState } from 'react';

import { useAppContext } from '../App/appContext';

import { Column } from './components/Column/Column';
import { Tile } from '../Tile/Tile';

import './Canvas.css';

export const Canvas = () => {
  const [activeTaleId, setActiveTaleId] = useState();
  const { state, removeUrl, selectSortedUrlPerCols } = useAppContext();

  const onRemove = (ID) => {
    state.urls.find(({ id }) => id === ID) && removeUrl(ID);
  }

  const sortedUrls = selectSortedUrlPerCols(state);

  return (
    <div className="canvas-wrapper">
      <div className="canvas">
        {sortedUrls.map((col, index) => (
          <Column key={index}>
            {col.map(({ id, url, mounted }) =>
              <Tile
                key={id}
                id={id}
                url={url}
                mounted={mounted}
                onRemove={onRemove}
                style={{ zIndex: ( activeTaleId === id ) ? 1000 : 100 }}
                onPointerDown={() => setActiveTaleId(id)}
              />
            )}
          </Column>
        ))}
      </div>
    </div>
  );
};
