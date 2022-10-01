import ResultsList from "./ResultsList";
import React from "react";
import { useState } from "react";

function Results({ divisions, seasons }) {

  const seasonsMostRecentFirst = [...seasons].reverse();
  const [division, setDivision] = useState(divisions[0]);
  const [season, setSeason] = useState(seasonsMostRecentFirst[0]);

  const handleDivisionChange = (e) => {
    setDivision(divisions[e.target.value])
  }

  const handleSeasonChange = (e) => {
    setSeason(seasonsMostRecentFirst[e.target.value])
  }

  return (
    <div className="results-container">
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
      <ResultsList division={division} season={season} />
    </div>
  )
}

export default Results;