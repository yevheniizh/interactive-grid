import React, { useState, useRef } from 'react';

import { useAppContext } from '../App/appContext';

import { useDragger } from '../../hooks/useDragger';
import { useResizer } from '../../hooks/useResizer';
import { useLogger } from '../../hooks/useLogger';

import { Column } from './components/Column/Column';
import { Tile } from '../Tile/Tile';

import './Canvas.css';

export const Canvas = () => {
  const ref = useRef(null);
  const [activeTaleId, setActiveTaleId] = useState();
  const { state, removeUrl, selectSortedUrlPerCols } = useAppContext();

  const onRemove = (ID) => {
    state.urls.find(({ id }) => id === ID) && removeUrl(ID);
  }

  // Delegate all events to the Canvas
  // Instead of having a lot of event listeners on each Tile
  useDragger(ref);
  useResizer(ref);
  useLogger(ref);

  const sortedUrls = selectSortedUrlPerCols(state);

  return (
    <div className="canvas-wrapper">
      <div className="canvas" ref={ref}>
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
