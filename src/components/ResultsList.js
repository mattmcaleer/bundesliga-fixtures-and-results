import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

function ResultsList({ division, season }) {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState()
  const [selectedDivision, setSelectedDivision] = useState()

  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = () => {
    fetch(`https://www.openligadb.de/api/getmatchdata/${division.value}/${season.value}`)
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

  const date = new Date();
  const thisYear = date.getFullYear()
  const thisMonth = date.getMonth() + 1
  const thisDay = date.getDate()
  const today = new Date(`${thisYear}-${thisMonth}-${thisDay}`)

  const resultsPerPage = 9;
  const offset = currentPage * resultsPerPage;
  const currentPageData = filteredData.slice(offset, offset + resultsPerPage)
    .map(( matchInfo, i ) =>  (
      <div className='fixtures' key={i}>
        <div className='matchDetails'>
          <div className='time-and-date'>
            {matchInfo.MatchDateTime.slice(0, 10)} {matchInfo.MatchDateTime.slice(11, 16)}<br></br>
          </div>
          <span className='score'>
            <img className='team-icon' src={matchInfo.Team1.TeamIconUrl} alt='club-icon'></img>
            <h3>{matchInfo.Team1.TeamName}</h3>
            <p> {new Date(matchInfo.MatchDateTime.slice(0, 10)) < today ? matchInfo.MatchResults.map((result) => result.PointsTeam1)[0] : "TBC"} : {new Date(matchInfo.MatchDateTime.slice(0, 10)) < today ? matchInfo.MatchResults.map((result) => result.PointsTeam2)[0] : "TBC"} </p>
            <h3>{matchInfo.Team2.TeamName}</h3>
            <img className='team-icon' src={matchInfo.Team2.TeamIconUrl} alt='club-icon'></img>
          </span>
        </div>

        <ul className='expanded-content'>
          {matchInfo.Goals.length > 0 ? "Scorers: " : ""}<br/>
            {matchInfo.Goals.map((g) => 
              <li key={g.GoalID}>{g.GoalGetterName}, {g.MatchMinute}' <b>({(g.ScoreTeam1)}-{g.ScoreTeam2})</b><br/></li>
            )}
        </ul>            
      </div>));
          
  const pageCount = Math.ceil(allData.length / resultsPerPage);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
 
  if (!isLoaded) return <div className='loader'/>;

  return (
    <div className="results">
      <button onClick={fetchData}>Go</button>

      <div className="results-list">
        <h1>{selectedDivision}: {selectedSeason}</h1>
        {currentPageData}
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          pageRangeDisplayed={0}
          marginPagesDisplayed={0}
          onPageChange={handlePageClick}
          className={"paginate"}
          pageClassName={"pageClassName"}
          activeClassName={"activeClassName"}
        />
      </div>
    </div>
  )
}

export default ResultsList;

