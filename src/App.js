import './App.css';
import { useState, useEffect } from 'react';
import ResultsList from './components/ResultsList';
import NavBar from './components/NavBar';

function App() {

    return (
        <div className='App'>
            <NavBar />
            <ResultsList />
        </div>
  );
}

export default App;
