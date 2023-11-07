import React, { forwardRef } from 'react';

import { useImgLoaded, useVideoLoaded } from "../../hooks/useHandleMediaOnReady";

import { isVideoUrl } from '../../../../utils/common.util';

import './MediaElement.css';

const Image = React.forwardRef((props, ref) => {
  const { onLoad, onError } = useImgLoaded(ref);
  return (
    <img
      {...props}
      onLoad={onLoad}
      onError={onError}
      ref={ref}
    />
  );
});

const Video = React.forwardRef((props, ref) => {
  useVideoLoaded(ref);
  return (
    <video
      {...props}
      ref={ref}
      loop
      muted
      playsInline
      controls
      onClick={(e) => e.preventDefault()}
    />
  );
});

export const MediaElement = forwardRef(({ url, ...props }, ref) => {
  const Component = isVideoUrl(url) ? Video : Image;
  return (
    <Component
      {...props}
      className="media"
      src={url}
      ref={ref}
    />
  );
});
