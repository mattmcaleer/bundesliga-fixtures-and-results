import React, { useState, useEffect } from 'react';

function LeagueTable({ seasons, divisions }) {
  const [allData,setAllData] = useState([]);
  const [filteredData,setFilteredData] = useState(allData);
  const [isLoaded, setIsLoaded] = useState(false);
  const seasonsMostRecentFirst = [...seasons].slice(-12).reverse();
  const [division, setDivision] = useState(divisions[0]);
  const [season, setSeason] = useState(seasonsMostRecentFirst[0]);
  const [selectedSeason, setSelectedSeason] = useState()
  const [selectedDivision, setSelectedDivision] = useState()

  const handleDivisionChange = (e) => {
    setDivision(divisions[e.target.value])
  }
  
  const handleSeasonChange = (e) => {
    setSeason(seasonsMostRecentFirst[e.target.value])
  }
    
  const fetchData = () => {
    fetch(`https://www.openligadb.de/api/getbltable/${division.value}/${season.value}`)
      .then(response => response.json())
      .then(data => {
        setAllData(data);
        setFilteredData(data);
        setIsLoaded(true);
        setSelectedSeason(season.label);
        setSelectedDivision(division.label);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (!isLoaded) return <div className='loader'></div>;

  return (
    <>
      <div className="filter-table-container">
        <form>
          <label>Division: </label>
          <select
            defaultValue={division}
            onChange={handleDivisionChange}>
            {divisions.map((value, i) => (
              <option value={i} key={i}>
                {value.label}
              </option>
            ))}
          </select>

          <label> Season: </label>
          <select 
            defaultValue={season}
            onChange={handleSeasonChange}>
            {seasonsMostRecentFirst.map((value, i) => (
              <option value={i} key={i}>
                {value.label}
              </option>
            ))}
          </select>
        </form>
        <button onClick={fetchData}>Go</button>
      </div>
      <div className='table'>
        <h1>{selectedDivision}: {selectedSeason}</h1>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>CLUB</th>
              <th>PLAYED</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>POINTS</th>
              </tr>
            </thead>
            <tbody>
            {filteredData.map((tableInfo, i) => (
            <tr key={i}>
              <td><img className='team-icon' src={tableInfo.TeamIconUrl} alt="Club logo"></img></td>
              <td>{tableInfo.TeamName}</td>
              <td>{tableInfo.Matches}</td>
              <td>{tableInfo.Won}</td>
              <td>{tableInfo.Draw}</td>
              <td>{tableInfo.Lost}</td>
              <td>{tableInfo.Goals}</td>
              <td>{tableInfo.OpponentGoals}</td>
              <td>{tableInfo.GoalDiff}</td>
              <td>{tableInfo.Points}</td>
            </tr>
            ))} 
            </tbody> 
        </table>
      </div>
    </>
  )
}

export default LeagueTable;