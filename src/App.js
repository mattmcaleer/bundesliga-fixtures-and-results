import './App.css';
import React from 'react';
import NavBar from './components/NavBar';
import LeagueTable from './components/LeagueTable';
import { Route, Routes } from 'react-router-dom';
import Results from './components/Results';
import TitlePage from './components/TitlePage';

function App() {
  const divisions = [
    { label: "Bundesliga", value: "bl1" },
    { label: "2. Bundesliga", value: "bl2" },
  ];

  const seasons = [
    { label: "2003-04", value: "2003" },
    { label: "2004-05", value: "2004" },
    { label: "2005-06", value: "2005" },
    { label: "2006-07", value: "2006" },
    { label: "2007-08", value: "2007" },
    { label: "2008-09", value: "2008" },
    { label: "2009-10", value: "2009" },
    { label: "2010-11", value: "2010" },
    { label: "2011-12", value: "2011" },
    { label: "2012-13", value: "2012" },
    { label: "2013-14", value: "2013" },
    { label: "2014-15", value: "2014" },
    { label: "2015-16", value: "2015" },
    { label: "2016-17", value: "2016" },
    { label: "2017-18", value: "2017" },
    { label: "2018-19", value: "2018" },
    { label: "2019-20", value: "2019" },
    { label: "2020-21", value: "2020" },
    { label: "2021-22", value: "2021" },
    { label: "2022-23", value: "2022" }  
  ];

  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path="/bundesliga-fixtures-and-results/" element={<TitlePage />} />
        <Route path="/bundesliga-fixtures-and-results/fixtures" element={<Results seasons={seasons} divisions={divisions} />} />
        <Route path="/bundesliga-fixtures-and-results/table" element={<LeagueTable seasons={seasons} divisions={divisions} />} />
      </Routes>
    </div>
  );
}

export default App;


