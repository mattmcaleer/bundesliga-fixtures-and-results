import React, { useState, useEffect } from 'react';

function LeagueTable() {
    const [allData,setAllData] = useState([]);
    const [filteredData,setFilteredData] = useState(allData);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isActive, setActive] = useState("false");
    const season = "2021"
    const division = ["bl1", "bl2"]
    
    useEffect(() => {
        fetch(`https://www.openligadb.de/api/getbltable/${division[0]}/${season}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setAllData(data);
                setFilteredData(data);
                setIsLoaded(true);
            })
            .catch(err => console.error(err));
    }, [])

    const handleToggle = () => {
        setActive(!isActive);
    };

    if (!isLoaded) return <div className='loader'></div>;

    return (
        <div>
        <h1 onClick={handleToggle}>BUNDESLIGA 1</h1>
        <table className={isActive ? "table-expanded" : "table-collapsed"}>
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
    {filteredData.map((tableInfo) => (
        <tr>
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
        </table>
        </div>
    )
}

export default LeagueTable;