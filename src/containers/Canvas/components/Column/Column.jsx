import React from 'react';

import './Column.css';

export const Column = (props) => {
  return (
    <div className='column'>
      {props.children}
    </div>
  );
};
