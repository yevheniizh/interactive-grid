import React from 'react';

import { isVideoUrl } from '../../../../utils/common.util';

import './RemoveButton.css';

export const RemoveButton = (props) => {
  return (
    <button
      className='remove-button'
      data-draggable='false'
      onPointerUp={() => {
        if (isVideoUrl(props.url)) {
          // dispose video from the DOM in right way
          mediaRef.current.pause();
          mediaRef.current.removeAttribute('src'); // empty source
          mediaRef.current.load();
        }

        props.onPointerUp(props.id);
      }}
    >
      <span className='remove-button--icon' />
    </button>
  );
};
