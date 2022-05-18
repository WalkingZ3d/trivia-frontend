import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HighScorePage = () => {

    const[highScore, setHighScore] = useState([]);

    useEffect( () => {
    
        async function getQuestions () {

            try {
                const {data} = await axios.get(`https://neweet-server.herokuapp.com/records/winners`);
                console.log(data);              
            } catch(err) {
                console.error(err);
            }
       
        }
        getQuestions();
    
    }, [])
    
    return (
        <>
        <div className="jumbotron text-center" id="title">
            <h1 id="titleH1">HIGHSCORES</h1>
            <br/>
        </div>
        <br/>
        <div className="container-fluid justify-content-center text-center">
            <div className="row ">
                <div className="col-sm-12 ">
                   
                </div>
            </div>
        </div>
    </>
    )
}

export default HighScorePage;