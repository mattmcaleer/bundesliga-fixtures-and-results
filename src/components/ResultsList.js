import { useState, useEffect } from 'react';

function ResultsList() {
    const [matchResults, setMatchResults] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch('https://www.openligadb.de/api/getmatchdata/bl1/2021')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setMatchResults(data);
                setIsLoaded(true);
            })
            .catch(err => console.error(err));
    }, [])

    if (!isLoaded) return <h3>Loading...</h3>;

    return (
       <div className="Results">
            {matchResults.map((matchInfo) => (
                <div>
                    {matchInfo.MatchID}<br></br>
                    {matchInfo.MatchDateTime}<br></br>
                    {matchInfo.Team1.TeamName} {matchInfo.MatchResults.map((result) => result.PointsTeam1)[0]}<br></br>
                    {matchInfo.Team2.TeamName} {matchInfo.MatchResults.map((result) => result.PointsTeam2)[0]}<br></br>
                    Scorers: <li>{matchInfo.Goals.map((goals) => goals.GoalGetterName)}</li> <br></br>
                    <br></br>
                </div>
            ))}
    </div>
  );
}

export default ResultsList;
