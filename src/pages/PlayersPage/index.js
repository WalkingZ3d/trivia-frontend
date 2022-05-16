import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlayersPage = () => {

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        let player1 = document.getElementById('numPlayer1').value;
        let player2 = document.getElementById('numPlayer2').value;
        let player3 = document.getElementById('numPlayer3').value;
        let player4 = document.getElementById('numPlayer4').value;
        console.log(player1, player2, player3, player4);   
        console.log("yes");
        //navigate('/options/players/game');
    }

    function renderPlayers(times) {
        let arr = [];
        for (let i = 0; i < times; i++) {
            arr.push(i);
        }
        return arr.map((s, i) => <>
                                    <label htmlFor="numPlayers" className='optionsLabel'>Player {s+1}: </label>
                                    <input key={s} type="text" id={`numPlayer${i+1}`} name='numPLayers' className='optionsInp'/>
                                    <br/><br/>
                                </>)         
    }
       
    return (
        <>
        <div className="jumbotron text-center" id="title">
        <br/><br/>
            <h1 id="titleH1">Enter The Players</h1>
            <br/>
        </div>
        <br/>
        <div className="container-fluid justify-content-center text-center">
            <div className="row ">
                <div className="col-sm-12 ">
                <form onSubmit={handleSubmit} role="form"> 
                    { renderPlayers(4) }
                    <input type='submit' value='Next' id='cardBtn'/>
                </form>
                </div>
            </div>
            <br/>
        </div>
    </>
    )
}

export default PlayersPage;