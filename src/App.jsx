import React, { useEffect } from 'react';

import useDragger from "./useDragger";
import useResizer from "./useResizer";

import newId from './newid.util.js';

import './style.css';

const links = [
  'https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/avatar2-trailer-short.mp4',
  'https://sjc1.vultrobjects.com/moments/demo/retail/1.jpg',
  'https://sjc1.vultrobjects.com/moments/ads/square-emoji.png',
  'https://ewr1.vultrobjects.com/moments/videos/car-parts.mp4',
  'https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/vbqr.png',
  'https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/coca-cola-banner-right.jpg',
  'https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/coca-cola-short.mp4',
];

// Draggable - DONE
// Resizable - DONE
// Keeps aspect-ratio - DONE
// Deletion? - DONE
// Contains Log button (x, y, width, height (pixels or %). Alternatively, the information can be display in the UI all the time)
export const Tile = (props) => {
  return <div className="tile">{props.children}</div>;
};

export const Canvas = (props) => {
  return (
    <div className="canvas-wrapper">
      <div className="canvas">
        {props.children}
      </div>
    </div>
  );
};

// Add strategy for img and video
export const MediaHolder = (props) => {
  const ref = React.useRef(null);
  const mediaRef = React.useRef(null);

  const videoRegExp = new RegExp(/https?:\/\/.*\.(?:mp4)/i);
  const isVideo = videoRegExp.test(props.src);

  const onLoad = () => {
    if (ref.current?.classList.contains('unmounted')) {
      ref.current?.classList.remove('unmounted');
    }
  };

  const onError = () => {
    if (!ref?.current?.classList.contains('unmounted')) {
      ref?.current?.classList.add('unmounted');
    }
  };

  useDragger(ref);
  useResizer(ref);

  return (
    <div
      className="tile"
      ref={ref}
      style={props.style}
    >
      <div className="box">
        {isVideo ? (
          <video
            className="media"
            src={props.src}
            onLoad={onLoad}
            onError={onError}
            ref={mediaRef}

            autoPlay
            muted
            loop
            playsInline
            controls
            onClick={(e) => e.preventDefault()}
          />
        ) : (
          <img
            className="media"
            src={props.src}
            onLoad={onLoad}
            onError={onError}
            ref={mediaRef}
          />
        )}
      </div>
      <div className='resizer' />
      <button
        className='remove'
        onPointerUp={() => {
          if (isVideo) {
            // dispose video from the DOM in right way
            mediaRef.current?.pause();
            mediaRef.current?.removeAttribute('src'); // empty source
            mediaRef.current?.load();
          }

          props.onRemove(props.id);
        }}>
        <span className='remove-icon' />
      </button>
    </div>
  );
};

export const Form = (props) => {
  const [valid, setValid] = React.useState(false);

  return (
    <form onSubmit={props.onSubmit}>
      {/* URL-validation? */}
      <input
        type="url"
        name="url"
        id="url"
        placeholder="https://example.com"
        pattern="https://.*"
        onChange={(e) => e.target.validity.valid && setValid(true)}
        autoFocus
      />
      <button type="sumbit" disabled={!valid}>Add</button>
      <button type="button" disabled>
        Play all
      </button>

    </form>
  );
};

export default function App() {
  const [urls, setUrls] = React.useState([
    [newId(), links[5]],
    [newId(), links[6]],
  ]);

  const onRemove = (id) => {
    urls.find(([id2]) => id === id2) && setUrls((urls) => urls.filter(([id2]) => id !== id2));
  };

  return ( 
    <div className="container">
      <Form
        onSubmit={(e) => {
          e.preventDefault();

          const url = e.target.url.value;

          if (url) {
            setUrls((urls) => [...urls, [newId(), url]]);
            e.target.url.value = '';
          }
        }}
      />

      <Canvas>
        {urls.map(([id, src], index) => (
          <MediaHolder id={id} src={src} key={id} onRemove={onRemove} />
        ))}
      </Canvas>
    </div>
  );
}
