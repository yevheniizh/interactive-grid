import React from 'react';

import { AppProvider } from './appContext';

import { Layout } from '../Layout/Layout';
import { Form } from '../Form/Form';
import { Canvas } from '../Canvas/Canvas';

import './App.css';

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
