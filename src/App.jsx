import React from 'react';

import useDragger from "./useDragger";
import useResizer from "./useResizer";
import { CanvasProvider, useCanvasContext } from './canvasContext';

import './style.css';

// Draggable - DONE
// Resizable - DONE
// Keeps aspect-ratio - DONE
// Deletion? - DONE
// Contains Log button (x, y, width, height (pixels or %). Alternatively, the information can be display in the UI all the time)
export const Tile = (props) => {
  return <div className="tile">{props.children}</div>;
};

export const Canvas = (props) => {
  const { urls, removeUrl } = useCanvasContext();

  const onRemove = (ID) => {
    urls.find(({ id }) => id === ID) && removeUrl(ID);
  }

  return (
    <div className="canvas-wrapper">
      <div className="canvas">
        {urls.map(({ id, url }) => (
          <MediaHolder key={id} id={id} url={url} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

// Add strategy for img and video
export const MediaHolder = (props) => {
  const ref = React.useRef(null);
  const mediaRef = React.useRef(null);

  const videoRegExp = new RegExp(/https?:\/\/.*\.(?:mp4)/i);
  const isVideo = videoRegExp.test(props.url);

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
            src={props.url}
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
            src={props.url}
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
            mediaRef.current.pause();
            mediaRef.current.removeAttribute('src'); // empty source
            mediaRef.current.load();
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
  const { addUrl } = useCanvasContext();

  const onSubmit = (e) => {
    e.preventDefault();

    const url = e.target.url.value;

    if (url) {
      addUrl(url);
      e.target.url.value = '';
    }
  };

  return (
    <form onSubmit={onSubmit}>
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
      <button type="button" disabled onPointerUp={() => {

      }}>
        Play all
      </button>
    </form>
  );
};

export default function App() {
  return ( 
    <CanvasProvider>
      <div className="container">
        <Form />
        <Canvas/>
      </div>
    </CanvasProvider>
  );
}
