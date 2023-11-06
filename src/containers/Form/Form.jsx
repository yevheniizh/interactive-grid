import React from 'react';

import { useAppContext } from '../App/appContext';

export const Form = () => {
  const [valid, setValid] = React.useState(false);
  const { addUrl, selectVideoUrls } = useAppContext();

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
        selectVideoUrls
      }}>
        Play all
      </button>
    </form>
  );
};
