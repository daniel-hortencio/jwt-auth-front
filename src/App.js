import React from 'react';

import Routes from './Routes';
import { AuthProvider } from './contexts/Auth'

import './styles.css'

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App
