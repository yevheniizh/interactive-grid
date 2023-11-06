import { createContext, useContext, useReducer } from 'react';

import newId from './newid.util';

const links = [
  'https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/avatar2-trailer-short.mp4',
  'https://sjc1.vultrobjects.com/moments/demo/retail/1.jpg',
  'https://sjc1.vultrobjects.com/moments/ads/square-emoji.png',
  'https://ewr1.vultrobjects.com/moments/videos/car-parts.mp4',
  'https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/vbqr.png',
  'https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/coca-cola-banner-right.jpg',
  'https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/coca-cola-short.mp4',
];

/* ******* */

const CanvasContext = createContext( {} );

const types = {
  ADD_URL: "ADD_URL",
  REMOVE_URL: "REMOVE_URL",
};

const reducer = ( state, action ) => {
  switch ( action.type ) {
    case types.ADD_URL:
      return ({
        ...state,
        urls: [ ...state.urls, { id: newId(), url: action.payload } ]
      });
    case types.REMOVE_URL:
      return ({
        ...state,
        urls: state.urls.filter( ( { id } ) => id !== action.payload )
      });
    default:
      return state;
  }
}

const initialState = {
  urls: [
    { id: newId(), url: links[5] },
    { id: newId(), url: links[6] },
  ],
};

export const CanvasProvider = ( { children } ) => {
  const [state, dispatch] = useReducer( reducer, initialState );

  const value = {
    urls:      state.urls,
    addUrl:    ( url ) => dispatch( { type: types.ADD_URL, payload: url } ),
    removeUrl: ( index ) => dispatch( { type: types.REMOVE_URL, payload: index } ),
   };

  return (
    <CanvasContext.Provider value={value}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => useContext( CanvasContext );
