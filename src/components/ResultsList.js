import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

function ResultsList({ division, season }) {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState()
  const [selectedDivision, setSelectedDivision] = useState()

  const [currentPage, setCurrentPage] = useState(0);

  console.log(division)

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

  const resultsPerPage = 9;
  const offset = currentPage * resultsPerPage;
  const currentPageData = filteredData.slice(offset, offset + resultsPerPage)
    .map(( matchInfo, i ) =>  (
      <div className='fixtures' key={i}>
        <div className='matchDetails'>
          <div className='time-and-date'>
            {matchInfo.MatchDateTime.slice(0, 10)} {matchInfo.MatchDateTime.slice(11, 19)}<br></br>
          </div>
          <span className='score'>
            <img className='team-icon' src={matchInfo.Team1.TeamIconUrl} alt='club-icon'></img>
            <h3>{matchInfo.Team1.TeamName}</h3>
            <p> {matchInfo.MatchResults.map((result) => result.PointsTeam1)[0]} : {matchInfo.MatchResults.map((result) => result.PointsTeam2)[0]} </p>
            <h3>{matchInfo.Team2.TeamName}</h3>
            <img className='team-icon' src={matchInfo.Team2.TeamIconUrl} alt='club-icon'></img>
          </span>
        </div>

        <ul className='expanded-content'>
          {matchInfo.Goals.length > 0 ? "Scorers: " : ""}<br/>
            {matchInfo.Goals.map((g) => 
              <li key={g.GoalID}>{g.GoalGetterName}, {g.MatchMinute}<br/></li>
            )}
        </ul>            
      </div>));
          
  const pageCount = Math.ceil(allData.length / resultsPerPage);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  console.log(allData);
 
  if (!isLoaded) return <div className='loader'/>;

  return (
    <div className="App">
      <button onClick={fetchData}>Go</button>

      <div className="test">
        <h1>{selectedDivision}: {selectedSeason}</h1>
        {currentPageData}
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          className={"paginate"}
          pageClassName={"paginate-page-class-name"}
          activeClassName={"activeClassName"}
        />
      </div>
    </div>
  )
}

export default ResultsList;

