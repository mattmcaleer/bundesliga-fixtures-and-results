import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function ResultsList() {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState(allData);
    const [isLoaded, setIsLoaded] = useState(false);
    const division = "bl1"
    const season = [
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
        { label: "2021-22", value: "2021" } 
      ];

    useEffect(() => {
        fetch(`https://www.openligadb.de/api/getmatchdata/${division}/2021`)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                setAllData(data);
                setFilteredData(data);
                setIsLoaded(true);
            })
            .catch(err => console.error(err));
    }, [])

    console.log(allData)

    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
        console.log(value);
        result = allData.filter((data) => {
            const homeTeam = data.Team1.TeamName.toLowerCase();
            const awayTeam = data.Team2.TeamName.toLowerCase();
            //const scorer = data.Goals.map((goals) => goals.GoalGetterName).toLowerCase();
        return homeTeam.search(value) != -1 || awayTeam.search(value) != -1; //|| scorer.search(value) != -1;
        });
        setFilteredData(result);
    }
 
    if (!isLoaded) return <div className='loader'></div>;

    return (
    <div className="App">
        <div className='searchBar'>
        <label>Search:</label>
        <input placeholder='Search club or player' type="text" onChange={(event) =>handleSearch(event)} />
        </div>
        <div>
        <Select options={season} />
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
                    Scorers:<br></br>
                    <li>{matchInfo.Goals.map((goals) => goals.GoalGetterName)[0]}</li>
                    <li>{matchInfo.Goals.map((goals) => goals.GoalGetterName)[1]}</li>
                    <li>{matchInfo.Goals.map((goals) => goals.GoalGetterName)[2]}</li>
                    <li>{matchInfo.Goals.map((goals) => goals.GoalGetterName)[3]}</li>
                    <li>{matchInfo.Goals.map((goals) => goals.GoalGetterName)[4]}</li>
                    <li>{matchInfo.Goals.map((goals) => goals.GoalGetterName)[5]}</li>
                    <li>{matchInfo.Goals.map((goals) => goals.GoalGetterName)[6]}</li>
                    <li>{matchInfo.Goals.map((goals) => goals.GoalGetterName)[7]}</li>
                    </ul>
                    
                </div>
                
            ))}  
        </div>
    </div>
    )
}

export default ResultsList;

