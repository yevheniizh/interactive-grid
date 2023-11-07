import React, { useEffect } from 'react';

import { useDragger } from "../../hooks/useDragger";
import { useResizer } from "../../hooks/useResizer";
import { useLogger } from '../../hooks/useLogger';

import { isVideoUrl } from '../../utils/common.util';

import { MediaElement } from './components/MediaElement/MediaElement';
import { RemoveButton } from './components/RemoveButton/RemoveButton';
import { ResizeHandler } from './components/ResizeHandler/ResizeHandler';
import { TileWrapper } from './components/TileWrapper/TileWrapper';

import { useAppContext } from '../App/appContext';

import './Tile.css';

// Add strategy for img and video
export const Tile = (props) => {
  const { videoRefs } = useAppContext();

  const ref = React.useRef(null);
  const mediaRef = React.useRef(null);

  useDragger(ref);
  useResizer(ref);
  useLogger(ref);

  useEffect(() => {
    if (isVideoUrl(props.url)) {
      videoRefs.current.push(mediaRef.current);
    }
  }, []);

  return (
    <TileWrapper>
      <div
        className={[
          "tile",
          props.mounted ? "" : "unmounted", // However, The empty space is always reserved on.
        ].join(' ')}
        ref={ref}
        style={props.style}
        onPointerDown={props.onPointerDown}
      >
        <div className="box">
          <span className='log' />
          <MediaElement url={props.url} ref={mediaRef} />
        </div>
        <ResizeHandler />
        <RemoveButton
          onPointerUp={() => {
            if (isVideoUrl(props.url)) {
              // dispose video from the DOM in right way
              mediaRef.current.pause();
              mediaRef.current.removeAttribute('src');
              mediaRef.current.load();
            }
            props.onRemove(props.id);
          }}
          />
      </div>
    </TileWrapper>
  );
};
