import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './containers/App/App.jsx';

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
