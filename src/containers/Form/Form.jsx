import React from 'react';

import { useAppContext } from '../App/appContext';

import './Form.css';

export const Form = () => {
  const { addUrl, videoRefs } = useAppContext();

  const onSubmit = (e) => {
    e.preventDefault();

    const url = e.target.url.value;

    if (url) {
      addUrl(url);
      e.target.url.value = '';
    }
  };

  const handleInputValidity = (e) => {
    e.preventDefault();
    e.target.setCustomValidity(''); // reset custom validity error
    !e.target.checkValidity() && (
      e.target.setCustomValidity('Enter the URL address in format "https://.*.(mp4|webm|jpg|jpeg|png)"')
    );
  };

  return (
    <form className='form' onSubmit={onSubmit}>
      <input
        className='input'
        type="url"
        name="url"
        id="url"
        placeholder="https://example.com/filename.mp4..."
        pattern="https://.*.(mp4|webm|jpg|jpeg|png)"
        onChange={handleInputValidity}
        autoFocus
        autoComplete='off'
      />
      <button className="submit-button" type="sumbit">Add</button>
      <button className="play-all-videos-button" type="button"onClick={() => {
        videoRefs.current.forEach( (node) => {
          if(node.readyState >= 2) {
            node.paused ? node.play() : node.pause();
          }
        });
      }}>
        Play/pause all videos
      </button>
    </form>
  );
};
