import React, { useState, useEffect } from 'react';

function ResultsList({ division, season }) {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState(allData);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = () => {
        fetch(`https://www.openligadb.de/api/getmatchdata/${division}/${season}`)
        .then(response => response.json())
        .then(data => {
            setAllData(data);
            setFilteredData(data);
            setIsLoaded(true);
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
      fetchData();
    }, [])

    console.log(allData);

    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        console.log(value);
        let result = allData.filter((data) => {
            const homeTeam = data.Team1.TeamName.toLowerCase();
            const awayTeam = data.Team2.TeamName.toLowerCase();
            //const scorer = data.Goals.map((goals) => goals.GoalGetterName).toLowerCase();
        return homeTeam.search(value) !== -1 || awayTeam.search(value) !== -1; //|| scorer.search(value) != -1;
        });
        setFilteredData(result);
    }
 
    if (!isLoaded) return <div className='loader'/>;

    return (
      <div className="App">
        {console.log(division)}{console.log(season)}
        <button onClick={fetchData}>Go</button>

        <div className='searchBar'>
          <input placeholder='Search By Club' type="text" onChange={(event) => handleSearch(event)} />
          <button>Go</button>
        </div>
        <div>
          {filteredData.map((matchInfo, i) => (
                <div className='fixtures'>
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

                    <ul className='expanded-content' key={i}>
                    Scorers:<br/>
                    {matchInfo.Goals.map((g) => 
                      <li key={g.GoalID}>{g.GoalGetterName}, {g.MatchMinute}<br/></li>
                    )}
                    </ul>
                    
                </div>
                
            ))}  
        </div>
    </div>
    )
}

export default ResultsList;

