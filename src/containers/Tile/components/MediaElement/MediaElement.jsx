import React, { forwardRef } from 'react';

import { useHandleMediaOnReady } from "../../hooks/useHandleMediaOnReady";

import { isVideoUrl } from '../../../../utils/common.util';

import './MediaElement.css';

const Image = React.forwardRef((props, ref) => {
  return (
    <img
      {...props}
      ref={ref}
    />
  );
});

const Video = React.forwardRef((props, ref) => {
  return (
    <video
      {...props}
      ref={ref}
      loop
      playsInline
      controls
      onClick={(e) => e.preventDefault()}
    />
  );
});

export const MediaElement = forwardRef(({ url, ...props }, ref) => {
  const { onLoad, onError } = useHandleMediaOnReady(ref);

  const Component = isVideoUrl(url) ? Video : Image;

  return (
    <Component
      {...props}
      className="media"
      src={url}
      ref={ref}
      onLoad={onLoad}
      onError={onError}
    />
  );
});
