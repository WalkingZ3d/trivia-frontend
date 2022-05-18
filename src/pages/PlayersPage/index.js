import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPlayer1, getPlayer2, getPlayer3, getPlayer4 } from '../../actions';

const PlayersPage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const numPlayers = useSelector(state => state.numOfPlayers);
    const categoryID = useSelector(state => state.categoryID);

    useEffect(() => {
        // console.log("categoryID selected: ", categoryID);
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        let player1 = document.getElementById('numPlayer1').value;
        let player2 = ''; 
        let player3 = ''; 
        let player4 = ''; 

        const updatePlayer1 = player => dispatch(getPlayer1(player));
        const updatePlayer2 = player => dispatch(getPlayer2(player));
        const updatePlayer3 = player => dispatch(getPlayer3(player));
        const updatePlayer4 = player => dispatch(getPlayer4(player));

        if (numPlayers == 2) {
            player2 = document.getElementById('numPlayer2').value;
            updatePlayer2(player2);
        }

        if (numPlayers == 3) {
            player2 = document.getElementById('numPlayer2').value;
            player3 = document.getElementById('numPlayer3').value;
            updatePlayer2(player2);
            updatePlayer3(player3);
        }

        if (numPlayers == 4) {
            player2 = document.getElementById('numPlayer2').value;
            player3 = document.getElementById('numPlayer3').value;
            player4 = document.getElementById('numPlayer4').value;
            updatePlayer2(player2);
            updatePlayer3(player3);
            updatePlayer4(player4);
        }         
        
        updatePlayer1(player1);
        
        navigate('/options/players/game')


    }

    function renderPlayers(times) {
        let arr = [];
        for (let i = 0; i < times; i++) {
            arr.push(i);
        }
        return arr.map((s, i) => <div key={s}>
                                    <label htmlFor="numPlayers" className='optionsLabel'>Player {s+1}: </label>

                                    <input type="text" id={`numPlayer${i+1}`} name='numPLayers' className='optionsInp' placeholder={`Enter username of player ${i+1}`} required defaultValue={i+1}/>

                                    <br/><br/>
                                </div>)         
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

                    { renderPlayers(numPlayers) }

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