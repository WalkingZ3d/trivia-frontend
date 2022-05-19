import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HighScorePage = () => {

    const[highScore, setHighScore] = useState([]);

    useEffect( () => {
        async function getQuestions () {

            try {
                const {data} = await axios.get(`https://neweet-server.herokuapp.com/records/winners`);
                let arr = [];
                for (let i = 0; i < data.length; i++) {
                    arr.push(data[i]);
                }
                console.log("pre sort: ", arr)
                arr.sort((firstItem, secondItem) => secondItem.totWins - firstItem.totWins);
                console.log("post sort: ", arr)
                setHighScore(arr);            
            } catch(err) {
                console.error(err);
            }
       
        }
        getQuestions();
    
    }, [])

    function renderScores() {
        return highScore.map((s,i) => <div data-testid='loading' className={'highScores'} key={i}><h3 id='highName'>{s._id}<br></br><span id='highNum'>{s.totWins}</span></h3><br/></div>)
    }
    
    return (
        <>
        <div className="jumbotron text-center" id="title">
            <h1 id="titleH1">Leaderboard</h1>
            <br/>
        </div>
        <br/>
        <div className="container-fluid justify-content-center text-center">
            <div className="row ">
                <div className="col-sm-12 ">
                   {renderScores()}
                </div>
            </div>
        </div>        
    </>
    )
}

export default HighScorePage;