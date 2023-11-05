import React from 'react';
import './style.css';

const links = [
  'https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/avatar2-trailer-short.mp4',
  'https://sjc1.vultrobjects.com/moments/demo/retail/1.jpg',
  'https://sjc1.vultrobjects.com/moments/ads/square-emoji.png',
  'https://ewr1.vultrobjects.com/moments/videos/car-parts.mp4',
  'https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/vbqr.png',
  'https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/coca-cola-short.mp4',
  'https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/coca-cola-banner-right.jpg',
];

// Draggable
// Resizable
// Keeps aspect-ratio
// Deletion?
// Contains Log button (x, y, width, height (pixels or %). Alternatively, the information can be display in the UI all the time)
export const Tile = (props) => {
  return <div className="tile">{props.children}</div>;
};

export const Canvas = (props) => {
  return <div className="canvas">{props.children}</div>;
};

// export const getAspectRatio = (image) => {
//   const w = image.naturalWidth;
//   const h = image.naturalHeight;
//   return w > h ? w / h : h / w;
// };

// Add strategy for img and video
export const MediaHolder = (props) => {
  const [aspectRatio, setAspectRatio] = React.useState(undefined);
  const mediaHolderRef = React.useRef(null);
  const mediaRef = React.useRef(null);

  const videoReg = new RegExp(/https?:\/\/.*\.(?:mp4)/i);

  const onLoad = () => {
    if (mediaHolderRef.current?.classList.contains('unmounted')) {
      mediaHolderRef.current?.classList.remove('unmounted');
    }

    setAspectRatio(`${mediaRef.current.naturalWidth} / ${mediaRef.current.naturalHeight}`)

    mediaHolderRef.current?.style.setProperty('aspect-ratio', `${mediaRef.current.naturalWidth} / ${mediaRef.current.naturalHeight}`);
  };

  const onError = () => {
    if (!mediaHolderRef?.current?.classList.contains('unmounted')) {
      mediaHolderRef?.current?.classList.add('unmounted');
    }
  };

  return (
    <div className="tile" ref={mediaHolderRef} style={{aspectRatio}}>
      {videoReg.test(props.src) ? (
        <video
          className="media"
          src={props.src}
          onLoad={onLoad}
          onError={onError}
          ref={mediaRef}
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
  );
};

export default function App() {
  const assets = [];

  return (
    <div className="container">
      <form>
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

      <Canvas>
        {assets.map((_, index) => (
          <Tile key={index} />
        ))}

        <MediaHolder src="https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/vbqr.png" />
      </Canvas>
    </div>
  );
}
