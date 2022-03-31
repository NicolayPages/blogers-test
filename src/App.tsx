import React, { FC } from 'react';
import './assets/styles/App.scss'
import ErrorPopup from './components/ErrorPopup/ErrorPopup';
import Main from './pages/main/Main';

const App: FC = () => {
  return (
    <>
      <Main />
      <ErrorPopup />
    </>
  )
}

export default App