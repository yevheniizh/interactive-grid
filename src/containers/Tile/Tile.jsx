import React from 'react';

import { useDragger } from "../../hooks/useDragger";
import { useResizer } from "../../hooks/useResizer";

import { isVideoUrl } from '../../utils/common.util';

import { MediaElement } from './components/MediaElement/MediaElement';
import { RemoveButton } from './components/RemoveButton/RemoveButton';
import { ResizeHandler } from './components/ResizeHandler/ResizeHandler';

import './Tile.css';

// Add strategy for img and video
export const Tile = (props) => {
  const ref = React.useRef(null);
  const mediaRef = React.useRef(null);

  useDragger(ref);
  useResizer(ref);

  return (
    <div
      className="tile"
      ref={ref}
      style={props.style}
    >
      <div className="box">
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
        }} />
    </div>
  );
};