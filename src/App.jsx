import React, { useEffect } from 'react';

import useDragger from "./useDragger";
import useResizer from "./useResizer";

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

// Draggable
// Resizable
// Keeps aspect-ratio
// Deletion?
// Contains Log button (x, y, width, height (pixels or %). Alternatively, the information can be display in the UI all the time)
export const Tile = (props) => {
  return <div className="tile">{props.children}</div>;
};

export const Canvas = React.forwardRef((props, ref) => {
  return <div className="canvas" ref={ref}>{props.children}</div>;
} );

// Add strategy for img and video
export const MediaHolder = (props) => {
  const ref = React.useRef(null);
  const mediaRef = React.useRef(null);
  const [aspectRatio, setAspectRatio] = React.useState(null);

  const videoReg = new RegExp(/https?:\/\/.*\.(?:mp4)/i);

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
      style={{...props.style, aspectRatio}}
    >
      <div className="box">
        {videoReg.test(props.src) ? (
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
    </div>
  );
};

export default function App() {
  const ref = React.useRef(null);
  const COLUMNS = 5;
  const [urls, setUrls] = React.useState(links.slice(5));

  return ( 
    <div className="container">
      <form onSubmit={(e) => {
        e.preventDefault();

        const url = e.target.url.value;

        if (url) {
          setUrls((urls) => [...urls, url]);
          e.target.url.value = '';
        }
      }}>
        {/* URL-validation? */}
        <input
          type="url"
          name="url"
          id="url"
          placeholder="https://example.com"
          pattern="https://.*"
        />
        <button type="sumbit">Add</button>
        <button type="button" disabled>
          Play all
        </button>

      </form>

      <Canvas ref={ref}>
        {urls.map((src, index) => (
          <MediaHolder
            src={src}
            key={src}
            style={{
              top: `${(index * (ref.current?.offsetHeight || 0) / COLUMNS)}px`,
              left: `${(index * (ref.current?.offsetWidth || 0) / COLUMNS)}px`,
            }}
          />
        ))}
      </Canvas>
    </div>
  );
}
