import { useRef, createContext, useContext, useReducer } from 'react';

import { IdUtil } from '../../utils/id.util';

const urlIdUtil = new IdUtil();

const mockLinks = [
  'https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/avatar2-trailer-short.mp4',
  'https://sjc1.vultrobjects.com/moments/demo/retail/1.jpg',
  'https://sjc1.vultrobjects.com/moments/ads/square-emoji.png',
  'https://ewr1.vultrobjects.com/moments/videos/car-parts.mp4',
  'https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/vbqr.png',
  'https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/coca-cola-banner-right.jpg',
  'https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/coca-cola-short.mp4',
];



/* CONTEXT */
const AppContext = createContext( {} );



/* TYPES */
const types = {
  ADD_URL: "ADD_URL",
  REMOVE_URL: "REMOVE_URL",
};



/* REDUCER */
const reducer = ( state, action ) => {
  switch ( action.type ) {
    case types.ADD_URL:
      return ({
        ...state,
        urls: [ ...state.urls, { id: urlIdUtil.generateId(), url: action.payload, mounted: true } ]
      });
    case types.REMOVE_URL:
      return ({
        ...state,
        urls: state.urls.map( ( item ) =>
          // Do not remove it completely, just set the "mounted" to false.
          (item.id == action.payload) ? ({ ...item, mounted: false }) : item
        )
      });
    default:
      return state;
  }
}



/* STATE */
const initialState = {
  urls: [
    { id: urlIdUtil.generateId(), url: mockLinks[0], mounted: true },
    { id: urlIdUtil.generateId(), url: mockLinks[1], mounted: true },
    { id: urlIdUtil.generateId(), url: mockLinks[2], mounted: true },
    { id: urlIdUtil.generateId(), url: mockLinks[3], mounted: true },
    { id: urlIdUtil.generateId(), url: mockLinks[4], mounted: true },
    { id: urlIdUtil.generateId(), url: mockLinks[5], mounted: true },
    { id: urlIdUtil.generateId(), url: mockLinks[6], mounted: true },
  ],
};



/* PROVIDER */
export const AppProvider = ( { children } ) => {
  const videoRefs = useRef([]);
  const [state, dispatch] = useReducer( reducer, initialState );

  const value = {
    // State
    state,

    // Actions
    addUrl:    ( url ) => dispatch( { type: types.ADD_URL, payload: url } ),
    removeUrl: ( id ) => dispatch( { type: types.REMOVE_URL, payload: id } ),

    // Selectors
    state,
    videoRefs,
    selectSortedUrlPerCols: (state) => state.urls.reduce( ( acc, item, index ) => {
      const colIndex = index % 5;
      acc[colIndex].push(item);
      return acc;
    }, [[], [], [], [], []] ),
   };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};



/* HOOK */
export const useAppContext = () => useContext( AppContext );
