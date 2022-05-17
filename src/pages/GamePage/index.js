import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const PlayersPage = () => {

    const numPlayers = useSelector(state => state.numOfPlayers);
    const player1 = useSelector(state => state.player1);
    const player2 = useSelector(state => state.player2);
    const player3 = useSelector(state => state.player3);
    const player4 = useSelector(state => state.player4);

    useEffect(() => {
        console.log("num of players  : ", numPlayers);
        console.log("current player 1: ", player1);
        console.log("current player 2: ", player2);
        console.log("current player 3: ", player3);
        console.log("current player 4: ", player4);
    }, [])

    return (
        <>
        <div className="jumbotron text-center" id="title">
            <h1 id="titleH1">Game Page</h1>
            <br/>
        </div>
    </>
    )
}

export default PlayersPage;