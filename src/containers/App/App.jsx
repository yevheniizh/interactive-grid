import React from 'react';

import { AppProvider } from './appContext';

import { Layout } from '../Layout/Layout';
import { Form } from '../Form/Form';
import { Canvas } from '../Canvas/Canvas';

import './App.css';

// Draggable - DONE
// Resizable - DONE
// Keeps aspect-ratio - DONE
// Deletion? - DONE
// Play all video silmuntenously
// Contains Log button (x, y, width, height (pixels or %). Alternatively, the information can be display in the UI all the time)

// TODO:
// 0. Grid. How to implement it ?
// 1. Delegation of events to the Canvas ?
// 2. Get rid of the context ?
// 3. Validations
// 4. Design
// 5. Log
// 6. Tests

export default function App() {
  return ( 
    <AppProvider>
      <Layout>
        <Form />
        <Canvas />
      </Layout>
    </AppProvider>
  );
}
