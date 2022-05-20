import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import { getPlayerSudden1 } from '../../actions';

const GamePage = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const[questions, setQuestions] = useState([]); 

    const[suddenDeathQuestion, setSuddenDeathQuestion] = useState([]); 

    const[counter, setCounter] = useState(0);

    const[suddenCounter, setSuddenCounter] = useState(0);

    const[score1, setScore1] = useState(0);
    const[score2, setScore2] = useState(0);
    const[score3, setScore3] = useState(0);
    const[score4, setScore4] = useState(0);

    const[gameState, setGameState] = useState();

    const[currentPlayer, setCurrentPlayer] = useState();

    const[currentSuddenPlayer, setCurrentSuddenPlayer] = useState();

    const[nextPlayer, setNextPlayer] = useState();

    const[nextSuddenPlayer, setNextSuddenPlayer] = useState();

    const[winner, setWinner] = useState([]);

    const[complete, setComplete] = useState(false);

    const[sending, setSending] = useState(false);

    const[scoreChange, setScoreChange] = useState(false)

    const[tiebreaker, setTiebreaker] = useState(false);

    const[tiebreakerPlayers, setTiebreakerPlayers] = useState([])

    const[numOfSuddenPlayers, setNumOfSuddenPlayers] = useState(0);

    const[tiebreakerOver, setTiebreakerOver] = useState(false);
    
    const categoryID = useSelector(state => state.categoryID);
    const numOfTurns = useSelector(state => state.numOfTurns);
    const difficulty = useSelector(state => state.difficulty);
    const numOfPlayers = useSelector(state => state.numOfPlayers);
    const category = useSelector(state => state.category);
    const player1 = useSelector(state => state.player1);
    const player2 = useSelector(state => state.player2);
    const player3 = useSelector(state => state.player3);
    const player4 = useSelector(state => state.player4);

    useEffect( () => {
        if (complete) {
            determineWinner()
        }        
    }, [complete])

    useEffect( () => {
        setCurrentPlayer(player1)
        setNextPlayer(player2)
    }, [])

    useEffect( () => {
        if (tiebreakerOver) {
            console.log('winner is: ', player1)
            document.getElementById('turnH3').style.display = 'none';
            document.getElementById('nextH3').style.display = 'none';
            document.getElementById('endOfTiebreaker').textContent = 'The Winner Is: ' + player1 
        }        
    }, [tiebreakerOver])

    // useEffect( () => {
    //     if(scoreChange){
    //         updateScore(currentPlayer);
    //         setScoreChange(false)
    //     }
    // },[scoreChange])

    useEffect( () => {
        if(tiebreaker){
            console.log("made it to tiebreaker useEffect")
            console.log("the players at this stage:" , tiebreakerPlayers.length)
            setCurrentSuddenPlayer(tiebreakerPlayers[0])
            SuddenDeathQuestion();
        }
    },[tiebreaker])

    async function SuddenDeathQuestion () {
        console.log("number of players at this stage:" , tiebreakerPlayers.length)
        try {
            const result = await axios.get(`https://opentdb.com/api.php?amount=${tiebreakerPlayers.length}&category=${categoryID}&difficulty=${difficulty.toLowerCase()}&type=multiple`);
            setSuddenDeathQuestion(result.data.results)
            setNumOfSuddenPlayers(tiebreakerPlayers.length)                                    
        } catch(err) {
            console.error(err);
        }       
    }

    // useEffect(() => {
    //     if(questionDeath){
    //         document.getElementById('questionsSpan').textContent = questionDeath.question;
    //     }
    // },[suddenCounter])

const questionDeath = suddenDeathQuestion[suddenCounter]

    useEffect( () => {              
        if(questionDeath){
            for (let i = 0; i < questions.length; i++) {
                if(questionDeath.question == questions[i].question){
                    SuddenDeathQuestion()
                    break;
                } else{
                }            
            } 
            console.log("suddenDeathQuesion: ", questionDeath.question)
            console.log("result of sudden death call:", suddenDeathQuestion) 
            // const newQ = renderIncorrectAnswersTiebreaker(questionDeath);
            // React.createElement('div', {className: 'card-deck'}, newQ);
            // ReactDOM.render(newQ, document.getElementById('suddenCards'));
        }        
    }, [suddenDeathQuestion])

    useEffect( () => {
        async function sendToDB() {
            console.log("winner sent: ", winner[0])
            if (sending) {
                const dataToSend = {
                    'set_turns': numOfTurns,
                    'category': category,
                    'player_number': numOfPlayers,
                    'winner': winner[0],
                    'players_list': [
                                        {
                                            "name": player1, 
                                            "points": score1
                                        },
                                        {
                                            "name": player2, 
                                            "points": score2
                                        },
                                        {
                                            "name": player3, 
                                            "points": score3
                                        },
                                        {
                                            "name": player4, 
                                            "points": score4
                                        }
                                    ],
                    'game_info': {
                        'difficulty': difficulty,
                        'questions': questions
                    }
                }
                console.log("dataToSend: ", dataToSend)
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
                const address = 'https://neweet-server.herokuapp.com/records/create'
                axios({
                    method: 'post',
                    headers: headers,
                    url: address,
                    data: dataToSend
                  }).then(function (response) {
                    console.log("response from api:", response);
                  });     
            }        
        }
        sendToDB();        
    }, [sending])

    useEffect( () => {
        
        if (gameState === 'over') {
            console.log("i print if winner is changed")
            document.getElementById('over').textContent =  'Thanks For Playing!!';
            document.getElementById('winnerNameSpan').textContent = winner[0];
            document.getElementById('score').textContent = 'The Winner Is: '
            document.getElementById('score').style.color = '#FFF';
            document.getElementById('turnH3').style.display = 'none';
            document.getElementById('nextH3').style.display = 'none';
            document.getElementById('playerInfoT').style.display = 'none';
            document.getElementById('playerInfoB').style.display = 'none';
            document.getElementById('playerNames').style.marginTop= '30px';
            document.getElementById('againBtn').style.display = 'block';
        }
    },[winner])

    useEffect( () => {
    
        async function getQuestions () {

            try {
                const result = await axios.get(`https://opentdb.com/api.php?amount=${numOfTurns}&category=${categoryID}&difficulty=${difficulty.toLowerCase()}&type=multiple`);
                setQuestions(result.data.results);                
            } catch(err) {
                console.error(err);
            }       
        }
        getQuestions();
    
    }, [])

    
    const question = questions[counter]

    function incrementPlayers(){        
        if (numOfPlayers == 1) {
            if (nextPlayer === player1) {
                setNextPlayer(player1)
            }  
        } else if (numOfPlayers == 2) {
            if (nextPlayer === player2) {
                setNextPlayer(player1)
            } else if (nextPlayer === player1) {
                setNextPlayer(player2)
            } 
        } else if (numOfPlayers == 3) {
            if (nextPlayer === player2) {
                setNextPlayer(player3)
            } else if (nextPlayer === player3) {
                setNextPlayer(player1)
            } else if (nextPlayer === player1) {
                setNextPlayer(player2)
            } 
        } else if (numOfPlayers == 4) {
            if (nextPlayer === player2) {
                 setNextPlayer(player3)
             } else if (nextPlayer === player3) {
                 setNextPlayer(player4)
             } else if (nextPlayer === player4) {
                 setNextPlayer(player1)
             } else if (nextPlayer === player1) {
                 setNextPlayer(player2)
             } 
        }
        setCurrentPlayer(nextPlayer)
    }

    function incrementPlayersTiebreaker(){  
        console.log("within increment current player", currentSuddenPlayer)      
        console.log("within increment players in tie", tiebreakerPlayers)
        console.log("within increment next player", nextSuddenPlayer)

        if (tiebreakerPlayers[0] == player1 && tiebreakerPlayers[1] == player3){
            if (currentSuddenPlayer == player1) {
                console.log("next is player3")
                setNextPlayer(player3)
            } else if (currentSuddenPlayer == player3) {
                console.log("next is player1")
            }
        }

        if (numOfSuddenPlayers === 1) {
            setNextSuddenPlayer(player1)
        } else if (numOfSuddenPlayers === 2) {
            
            if (tiebreakerPlayers[0] == player1 && tiebreakerPlayers[1] == player2){
                if (currentSuddenPlayer == player1) {
                    setNextSuddenPlayer(player2)
                } else if (currentSuddenPlayer == player2) {
                    setNextSuddenPlayer(player1)
                }
            } else if (tiebreakerPlayers[0] == player1 && tiebreakerPlayers[2] == player3){
                if (currentSuddenPlayer == player1) {
                    setNextSuddenPlayer(player3)
                } else if (currentSuddenPlayer == player3) {
                    setNextSuddenPlayer(player1)
                }
            } else if (tiebreakerPlayers[0] == player1 && tiebreakerPlayers[2] == player4){
                if (currentSuddenPlayer == player1) {
                    setNextSuddenPlayer(player4)
                } else if (currentSuddenPlayer == player4) {
                    setNextSuddenPlayer(player1)
                }
            } else if (tiebreakerPlayers[0] == player2 && tiebreakerPlayers[2] == player3){
                if (currentSuddenPlayer == player2) {
                    setNextSuddenPlayer(player3)
                } else if (currentSuddenPlayer == player3) {
                    setNextSuddenPlayer(player2)
                }
            } else if (tiebreakerPlayers[0] == player2 && tiebreakerPlayers[2] == player4){
                if (currentSuddenPlayer == player2) {
                    setNextSuddenPlayer(player4)
                } else if (currentSuddenPlayer == player4) {
                    setNextSuddenPlayer(player2)
                }
            } else if (tiebreakerPlayers[0] == player3 && tiebreakerPlayers[2] == player4){
                if (currentSuddenPlayer == player3) {
                    setNextSuddenPlayer(player4)
                } else if (currentSuddenPlayer == player4) {
                    setNextSuddenPlayer(player3)
                }
            }
        }
        
        setCurrentSuddenPlayer(nextPlayer)
    }
    
    function updateScore(player){
        if (tiebreaker) {
            if (currentSuddenPlayer == player1) {
                setScore1(prev => prev + 1)
            } else if (currentSuddenPlayer == player2) {
                setScore2(prev => prev + 1)
            } else if (currentSuddenPlayer == player3) {
                setScore3(prev => prev + 1)
            } else if (currentSuddenPlayer == player4) {
                setScore4(prev => prev + 1)
            }
            
        } else {
            if (player === player1) {
                setScore1(prev => prev + 1)
            } else if (player === player2) {
                setScore2(prev => prev + 1)
            } else if (player === player3) {
                setScore3(prev => prev + 1)
            } else if (player === player4) {
                setScore4(prev => prev + 1)
            }  
        }
        
    }     

    
    function determineWinner(){
        let arr = [];
        
        if (score1 === 0 && score2 === 0 && score3 === 0 && score4 === 0 && numOfPlayers > 1){
            console.log("everyone failed")
            if (numOfPlayers == 2 ){
                arr.push(score1, score2);
            } else if (numOfPlayers == 3){
                arr.push(score1, score2, score3);
            } else if (numOfPlayers == 4){
                arr.push(score1, score2, score3, score4);
            }
        } else {
            arr.push(score1, score2, score3, score4);
        }
        
        // console.log("intial array: " , arr)
        let currentWin = arr[0];
        let winsArrNames = [];
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] === currentWin) {
                winsArrNames.push(`player${i+1}`);
            } else if(arr[i] > currentWin) {
                winsArrNames = []
                winsArrNames.push(`player${i+1}`);
                currentWin = arr[i];
            }
        }
        //console.log("winner array of strings: " , winsArrNames)
        let winsFinal = [];
        for (let i = 0; i < winsArrNames.length; i++) {
            if (winsArrNames[i] === 'player1') {
                winsFinal.push(player1)
            } else if (winsArrNames[i] === 'player2') {
                winsFinal.push(player2)
            } else if (winsArrNames[i] === 'player3') {
                winsFinal.push(player3)
            } else if (winsArrNames[i] === 'player4') {
                winsFinal.push(player4)
            }   
        }

        if (numOfPlayers == 1) {
            winsFinal = [];
            winsFinal.push(player1) 
        }

        console.log("number of winners:", winsFinal.length)
        console.log("winners array: " , winsFinal)
        if (winsFinal.length > 1 && numOfPlayers > 1) {
            setTiebreaker(true)
            console.log('tiebreaker true') 
            setTiebreakerPlayers(winsFinal);
            // let updatePlayerSudden1 = playerSudden1 => dispatch(getPlayerSudden1(playerSudden1));
            // updatePlayerSudden1(player1);
            // navigate('/options/players/game/suddendeath')
        } else if (numOfPlayers == 1 && score1 === 0){
            setTiebreaker(true)
            console.log('tiebreaker true for one player')  
            setTiebreakerPlayers(winsFinal);
            // let updatePlayerSudden1 = playerSudden1 => dispatch(getPlayerSudden1(playerSudden1));
            // updatePlayerSudden1(player1);
            // navigate('/options/players/game/suddendeath')
        }  else {
            console.log('tiebreaker false') 
            setWinner(winsFinal)
            setSending(true);
        }
        
    }

    function disableButtons(){
        document.getElementById('correctCard').disabled = true;
        document.getElementById(`card0`).disabled = true;
        document.getElementById(`card1`).disabled = true;
        document.getElementById(`card2`).disabled = true;
        document.getElementById('correct').style.pointerEvents = 'none';
        document.getElementById(`0`).style.pointerEvents = 'none';
        document.getElementById(`1`).style.pointerEvents = 'none';
        document.getElementById(`2`).style.pointerEvents = 'none';
    }

    function enableButtons(){
        document.getElementById('correctCard').disabled = false;
        document.getElementById(`card0`).disabled = false;
        document.getElementById(`card1`).disabled = false;
        document.getElementById(`card2`).disabled = false;
        document.getElementById('correct').style.pointerEvents = 'auto';
        document.getElementById(`0`).style.pointerEvents = 'auto';
        document.getElementById(`1`).style.pointerEvents = 'auto';
        document.getElementById(`2`).style.pointerEvents = 'auto';
    }

    const handleClick = (e) => {          

        const buttonClicked = e.target.id;
        //console.log("this one being clicked, ", buttonClicked)
        const theID = e.target.id.slice(-1);
        if (buttonClicked === "correctCard" || buttonClicked === "correct") {
            document.getElementById('correctCard').style.backgroundColor = '#0F0';
            document.getElementById('correctCard').style.fontWeight = 'bold';
            document.getElementById('correct').style.backgroundColor = '#0F0';
            document.getElementById('correct').style.fontWeight = 'bold';
            disableButtons();
            
            if(numOfPlayers > 1){
                const myTimeout = setTimeout(myStopFunction, 5000);
            
                function myStopFunction() {        
                    updateScore(currentPlayer);                   
                    clearTimeout(myTimeout);
                }
            } else {
                const myTimeout = setTimeout(myStopFunction, 5000);
            
                function myStopFunction() {        
                    setScore1(prev => prev + 1)                   
                    clearTimeout(myTimeout);
                }
                
            }
            
                                                       
        } else {
            document.getElementById(`card${theID}`).style.backgroundColor = '#F00';
            document.getElementById(`card${theID}`).style.fontWeight = 'bold';
            disableButtons();          
        }
       

        if (theID == '0' || theID == '1' || theID == '2') {
            const myTimeout = setTimeout(myStopFunction, 1000);
            
            function myStopFunction() {        
                document.getElementById('correctCard').style.backgroundColor = 'cyan';
                document.getElementById('correctCard').style.fontWeight = 'normal';                      
                clearTimeout(myTimeout);
            }
            const myTimeout2 = setTimeout(myStopFunction2, 4000);
        
            function myStopFunction2() {                         
                document.getElementById('correctCard').style.backgroundColor = '#abb2bf';
                document.getElementById('correctCard').style.fontWeight = 'normal';  
                document.getElementById(`card0`).style.backgroundColor = '#abb2bf';
                document.getElementById(`card0`).style.fontWeight = 'normal';
                document.getElementById(`card1`).style.backgroundColor = '#abb2bf';
                document.getElementById(`card1`).style.fontWeight = 'normal';
                document.getElementById(`card2`).style.backgroundColor = '#abb2bf';
                document.getElementById(`card2`).style.fontWeight = 'normal'; 
                incrementPlayers() 
                enableButtons();              
                clearTimeout(myTimeout2);                 
                setCounter(prev => prev + 1) 
                if (counter + 1  >= quizLength) {
                    setGameState('over')
                    setComplete(true);
                }
            }
            
              
        } else {
            const myTimeout3 = setTimeout(myStopFunction3, 5000);
            
            function myStopFunction3() {                                     
                document.getElementById('correctCard').style.backgroundColor = '#abb2bf';
                document.getElementById('correctCard').style.fontWeight = 'normal';        
                document.getElementById(`card0`).style.backgroundColor = '#abb2bf';
                document.getElementById(`card0`).style.fontWeight = 'normal';
                document.getElementById(`card1`).style.backgroundColor = '#abb2bf';
                document.getElementById(`card1`).style.fontWeight = 'normal';
                document.getElementById(`card2`).style.backgroundColor = '#abb2bf';
                document.getElementById(`card2`).style.fontWeight = 'normal';
                incrementPlayers()     
                enableButtons();           
                clearTimeout(myTimeout3);
                setCounter(prev => prev + 1) 
                if (counter + 1  >= quizLength) {
                    setGameState('over')
                    setComplete(true);                     
                }
            }                    
        }     
            
    }  
    
    const handleClickTiebreaker = (e) => {          

        const buttonClicked = e.target.id;
        //console.log("this one being clicked, ", buttonClicked)
        const theID = e.target.id.slice(-1);
        if (buttonClicked === "correctCard" || buttonClicked === "correct") {
            document.getElementById('correctCard').style.backgroundColor = '#0F0';
            document.getElementById('correctCard').style.fontWeight = 'bold';
            document.getElementById('correct').style.backgroundColor = '#0F0';
            document.getElementById('correct').style.fontWeight = 'bold';
            disableButtons();
            
            if(numOfSuddenPlayers > 1){
                const myTimeout = setTimeout(myStopFunction, 5000);
            
                function myStopFunction() {        
                    console.log('current sudden death player count:', numOfSuddenPlayers)
                    console.log('current sudden death player:', currentSuddenPlayer)
                    updateScore(currentPlayer);                   
                    clearTimeout(myTimeout);
                }
            } else {
                const myTimeout = setTimeout(myStopFunction, 5000);
            
                function myStopFunction() {        
                    setScore1(prev => prev + 1)      
                    console.log('this is not supposed to print')             
                    clearTimeout(myTimeout);
                }
                
            }
            
                                                       
        } else {
            document.getElementById(`card${theID}`).style.backgroundColor = '#F00';
            document.getElementById(`card${theID}`).style.fontWeight = 'bold';
            disableButtons();          
        }
       

        if (theID == '0' || theID == '1' || theID == '2') {
            const myTimeout = setTimeout(myStopFunction, 1000);
            
            function myStopFunction() {        
                document.getElementById('correctCard').style.backgroundColor = 'cyan';
                document.getElementById('correctCard').style.fontWeight = 'normal';                      
                clearTimeout(myTimeout);
            }
            const myTimeout2 = setTimeout(myStopFunction2, 4000);
        
            function myStopFunction2() {                         
                document.getElementById('correctCard').style.backgroundColor = '#abb2bf';
                document.getElementById('correctCard').style.fontWeight = 'normal';  
                document.getElementById(`card0`).style.backgroundColor = '#abb2bf';
                document.getElementById(`card0`).style.fontWeight = 'normal';
                document.getElementById(`card1`).style.backgroundColor = '#abb2bf';
                document.getElementById(`card1`).style.fontWeight = 'normal';
                document.getElementById(`card2`).style.backgroundColor = '#abb2bf';
                document.getElementById(`card2`).style.fontWeight = 'normal'; 
                incrementPlayersTiebreaker() 
                enableButtons();              
                clearTimeout(myTimeout2);                 
                setSuddenCounter(prev => prev + 1) 
                const myTimeout4 = setTimeout(myStopFunction4, 2000);
            
                function myStopFunction4() { 
                    console.log('score 1 in tiebreaker:', score1)
                    console.log('score 2 in tiebreaker:', score2)
                    if (score1 > score2 || score2 > score1) {
                    setTiebreakerOver(true)   
                    clearTimeout(myTimeout4);                 
                    }
                }
            }
            
              
        } else {
            const myTimeout3 = setTimeout(myStopFunction3, 5000);
            
            function myStopFunction3() {                                     
                document.getElementById('correctCard').style.backgroundColor = '#abb2bf';
                document.getElementById('correctCard').style.fontWeight = 'normal';        
                document.getElementById(`card0`).style.backgroundColor = '#abb2bf';
                document.getElementById(`card0`).style.fontWeight = 'normal';
                document.getElementById(`card1`).style.backgroundColor = '#abb2bf';
                document.getElementById(`card1`).style.fontWeight = 'normal';
                document.getElementById(`card2`).style.backgroundColor = '#abb2bf';
                document.getElementById(`card2`).style.fontWeight = 'normal';
                incrementPlayersTiebreaker()     
                enableButtons();           
                clearTimeout(myTimeout3);
                setSuddenCounter(prev => prev + 1) 
                

                const myTimeout4 = setTimeout(myStopFunction4, 2000);
            
                function myStopFunction4() { 
                    console.log('score 1 in tiebreaker:', score1)
                    console.log('score 2 in tiebreaker:', score2)
                    if (score1 > score2 || score2 > score1) {
                    setTiebreakerOver(true)   
                    clearTimeout(myTimeout4);                 
                    }
                }
            }                    
        }     
            
    }   

    const quizLength = questions.length;

    const quizLengthTiebreaker = suddenDeathQuestion.length;

    function renderIncorrectAnswers (question) {
        console.log('when it render qs', question)
        let arr = [];
              
        for (let index = 0; index < question.incorrect_answers.length; index++) {
            arr.push(   
                    <div id={index} className="card answer-card naked">
                        <button id={`card${index}`} onClick={handleClick} className="naked">
                            <div id={index} className="card-body text-center">
                                <p id={index} className="card-text">{question.incorrect_answers[index].replace(regQuotes, '"').replace(regApost, '’').replace(funnyI, 'í').replace(funnyO,'ö').replace(aRing, 'å').replace(funnyA, 'ä').replace(funnyO2, 'ó').replace(softHyphen, '').replace(funnyA2, 'á').replace(funnyE, 'é').replace(andSymb, '&').replace(dots, '...')}</p>
                                {/* <p id={index} className="card-text">{index}</p> */}
                            </div>
                        </button>
                    </div>)  
        } 
        arr.push(   
            <div id="correct" className="card answer-card naked">
                <button id='correctCard' onClick={handleClick} className="naked" style={{color: "red"}}>
                    <div id="correct" className="card-body text-center">
                        <p id="correct" className="card-text">{question.correct_answer.replace(regQuotes, '"').replace(regApost, '’').replace(funnyI, 'í').replace(funnyO,'ö').replace(aRing, 'å').replace(funnyA, 'ä').replace(funnyO2, 'ó').replace(softHyphen, '').replace(funnyA2, 'á').replace(funnyE, 'é').replace(andSymb, '&').replace(dots, '...')}</p>
                    </div>
                </button>
            </div>) 
        
        shuffle(arr);     
        return arr;
    }

    function renderIncorrectAnswersTiebreaker (question) {
       
        console.log('when it render new qs', question)
        let arr = [];

        document.getElementById('questionsSpan').textContent = 'question';
              
        for (let index = 0; index < question.incorrect_answers.length; index++) {
            document.getElementById('questionsSpan').textContent = question[index];
            arr.push(   
                    <div id={index} className="card answer-card naked">
                        <button id={`card${index}`} onClick={handleClickTiebreaker} className="naked">
                            <div id={index} className="card-body text-center">
                                <p id={index} className="card-text">{question.incorrect_answers[index].replace(regQuotes, '"').replace(regApost, '’').replace(funnyI, 'í').replace(funnyO,'ö').replace(aRing, 'å').replace(funnyA, 'ä').replace(funnyO2, 'ó').replace(softHyphen, '').replace(funnyA2, 'á').replace(funnyE, 'é').replace(andSymb, '&').replace(dots, '...')}</p>
                                {/* <p id={index} className="card-text">{index}</p> */}
                            </div>
                        </button>
                    </div>)  
        } 
        arr.push(   
            <div id="correct" className="card answer-card naked">
                <button id='correctCard' onClick={handleClickTiebreaker} className="naked" style={{color: "red"}}>
                    <div id="correct" className="card-body text-center">
                        <p id="correct" className="card-text">{question.correct_answer.replace(regQuotes, '"').replace(regApost, '’').replace(funnyI, 'í').replace(funnyO,'ö').replace(aRing, 'å').replace(funnyA, 'ä').replace(funnyO2, 'ó').replace(softHyphen, '').replace(funnyA2, 'á').replace(funnyE, 'é').replace(andSymb, '&').replace(dots, '...')}</p>
                    </div>
                </button>
            </div>) 
        
        shuffle(arr);     
        return arr;
    }
   
    function shuffle(array) {
        let currentIndex = array.length;
        let randomIndex;

        while (currentIndex != 0) {

            randomIndex = Math.floor(Math.random() * array.length);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

    return array;
    }

    function renderPlayers(times) {
        let arr = [];
        for (let i = 0; i < times; i++) {
            if (i == 0) {
                arr.push(                       
                    <div className="col-sm">
                       <span id='playerScoreName'>{player1 + ": "}</span><span id='playerScoreNum'>{score1}</span>
                    </div>
                   )           
            } else if (i == 1) {
                arr.push(                       
                    <div className="col-sm">
                       <span id='playerScoreName'>{player2 + ": "}</span><span id='playerScoreNum'>{score2}</span>
                    </div>
                   )      
            } else if (i == 2) {
                arr.push(                       
                    <div className="col-sm">
                       <span id='playerScoreName'>{player3 + ": "}</span><span id='playerScoreNum'>{score3}</span>
                    </div>
                   )      
            } else if (i == 3) {
                arr.push(                       
                    <div className="col-sm">
                    <span id='playerScoreName'>{player4 + ": "}</span><span id='playerScoreNum'>{score4}</span>
                 </div>
                   )      
            }
            
        } 
        return arr;
    }

    function renderPlayersTiebreaker(times) {
        let arr = [];
        for (let i = 0; i < times; i++) {
            if (i == 0) {
                if( tiebreakerPlayers[0] == player1){
                    arr.push(                       
                        <div className="col-sm">
                           <span id='playerScoreName'>{player1 + ": "}</span><span id='playerScoreNum'>{score1}</span>
                        </div>
                       )  
                } else if(tiebreakerPlayers[0] == player2){
                    arr.push(                       
                        <div className="col-sm">
                           <span id='playerScoreName'>{player2 + ": "}</span><span id='playerScoreNum'>{score2}</span>
                        </div>
                       )  
                } else if(tiebreakerPlayers[0] == player3){
                    arr.push(                       
                        <div className="col-sm">
                           <span id='playerScoreName'>{player3 + ": "}</span><span id='playerScoreNum'>{score3}</span>
                        </div>
                       )  
                }                         
            } else if (i == 1) {
                if (tiebreakerPlayers[1] == player2) {
                    arr.push(                       
                        <div className="col-sm">
                           <span id='playerScoreName'>{player2 + ": "}</span><span id='playerScoreNum'>{score2}</span>
                        </div>
                       )  
                } else if(tiebreakerPlayers[1] == player3){
                    arr.push(                       
                        <div className="col-sm">
                           <span id='playerScoreName'>{player3 + ": "}</span><span id='playerScoreNum'>{score3}</span>
                        </div>
                       )  
                } else if (tiebreakerPlayers){
                    arr.push(                       
                        <div className="col-sm">
                           <span id='playerScoreName'>{player4 + ": "}</span><span id='playerScoreNum'>{score4}</span>
                        </div>
                       )  
                }                 
                
            } else if (i == 1) {
                if (tiebreakerPlayers[1] == player2) {
                    arr.push(                       
                        <div className="col-sm">
                           <span id='playerScoreName'>{player2 + ": "}</span><span id='playerScoreNum'>{score2}</span>
                        </div>
                       )  
                } else if(tiebreakerPlayers[1] == player3){
                    arr.push(                       
                        <div className="col-sm">
                           <span id='playerScoreName'>{player3 + ": "}</span><span id='playerScoreNum'>{score3}</span>
                        </div>
                       )  
                } else if (tiebreakerPlayers[1] == player4){
                    arr.push(                       
                        <div className="col-sm">
                           <span id='playerScoreName'>{player4 + ": "}</span><span id='playerScoreNum'>{score4}</span>
                        </div>
                       )  
                }                 
                
            } else if (i == 2) {
                if (tiebreakerPlayers[2] == player3) {
                    arr.push(                       
                        <div className="col-sm">
                           <span id='playerScoreName'>{player3 + ": "}</span><span id='playerScoreNum'>{score3}</span>
                        </div>
                       )  
                } else if(tiebreakerPlayers[1] == player4){
                    arr.push(                       
                        <div className="col-sm">
                           <span id='playerScoreName'>{player4 + ": "}</span><span id='playerScoreNum'>{score4}</span>
                        </div>
                       )  
                }                
                
            }else if (i == 1) {
                if (tiebreakerPlayers[3] == player4) {
                    arr.push(                       
                        <div className="col-sm">
                           <span id='playerScoreName'>{player4 + ": "}</span><span id='playerScoreNum'>{score4}</span>
                        </div>
                       ) 
                    }               
            }
            
        } 
        return arr;
    }

    function renderCurrentPlayer() {
        return (
            <h3 id='turnH3'>Your Turn <span id='playerInfoT'>{currentPlayer}</span>!</h3>
        )
    }
    
    function renderNextPlayer() {
        if(counter === quizLength - 1) {
            return (
                <h3 id='nextH3'><span id='playerInfoB'>This is the Final Question</span></h3>
            )             
        } else {
            if (numOfPlayers > 1) {
                return (
                        <h3 id='nextH3'>Next Up: <span id='playerInfoB'>{nextPlayer}</span></h3>
                    ) 
                } else {
                    return (
                        <h3 id='nextH3'>Next Up: <span id='playerInfoB'>{player1}</span></h3>
                    ) 
                }
        }
        
        
    }
    
    function playAgain(){
        navigate('/')
    }

    const regQuotes = /\&quot;|\&ldquo;|\&rdquo;/g;
    const regApost = /\&#039;|\&rsquo;/g;
    const funnyI = /\&iacute;/g;
    const funnyO = /\&ouml;/g;
    const aRing = /\&aring;/g;
    const funnyA = /\k&auml;/g;
    const funnyA2 = /\&aacute;/g;
    const funnyO2 = /\&oacute;/g;
    const funnyE = /\&Eacute;|\&eacute/g;
    const softHyphen = /\&shy;|\&lrm;/g;
    const andSymb = /\&amp;/g;
    const dots = /\&hellip;/g
    // const p = "Bogot&aacute;"
    // console.log(p.replace(funnyA2, 'á'))

    return <>
                <div className="jumbotron text-center" id="title">
               
                    {tiebreaker ? <h1 id="titleH1" style={{color: "#ff5900"}}>Tiebreaker</h1> : <h1 id="titleH1">The Quiz</h1>}
                    <br/><br/>
                    {renderCurrentPlayer()}
                </div>
                

                <div className="container-fluid justify-content-center text-center">
                    <div className="row ">
                        <div className="col-sm-12 ">
                        <br/>
                            <span id='questionsSpan'>{question && <h3>{question.question.replace(regQuotes, '"').replace(regApost, '’').replace(funnyI, 'í').replace(funnyO,'ö').replace(aRing, 'å').replace(funnyA, 'ä').replace(funnyO2, 'ó').replace(softHyphen, '').replace(funnyA2, 'á').replace(funnyE, 'é').replace(andSymb, '&').replace(dots, '...')}</h3>}</span>
                        </div>
                    </div>
                </div> 
                <div className="container-fluid justify-content-center text-center">
                    <div className="row ">
                        <div className="col-sm-12 ">
                        <br/>
                            <span id='questionsSpanSudden'>{questionDeath && <h3>{questionDeath.question.replace(regQuotes, '"').replace(regApost, '’').replace(funnyI, 'í').replace(funnyO,'ö').replace(aRing, 'å').replace(funnyA, 'ä').replace(funnyO2, 'ó').replace(softHyphen, '').replace(funnyA2, 'á').replace(funnyE, 'é').replace(andSymb, '&').replace(dots, '...')}</h3>}</span>
                        </div>
                    </div>
                </div> 
                <br/><br/>
                <div className="container">
                <div className="card-deck">
                {question && renderIncorrectAnswers(question) || questionDeath && renderIncorrectAnswersTiebreaker(questionDeath)}
                 
                </div>
                </div>
                <div className="container" >
                <div className="card-deck" id='suddenCards'>
                {/* {questionDeath && renderIncorrectAnswersTiebreaker(questionDeath)} */}
                </div>
                </div>
                <br/><br/><br/>
                <div className="container-fluid justify-content-center text-center" >
                    <div className="row row-cols-1">
                            <div className="col-sm-12 ">
                                {renderNextPlayer()}
                            </div>
                        </div>
                    </div>

                <div className="container-fluid justify-content-center text-center">
                    <div className="row ">
                        <div className="col-sm-12 ">
                            <div id='endOfTiebreaker'></div>
                        </div>
                    </div>
                </div>
                
                <div className="container-fluid justify-content-center text-center">
                    <div className="row row-cols-1">
                            <div className="col-sm-12 ">
                                <h3 id='over'></h3>
                                <br/>
                                
                                <div>
                                    <h3 id='score'></h3>
                                    <h3 id='winnerNameSpan'></h3>
                                </div>
                                <br/>
                                <button onClick={playAgain} id='againBtn'>Play Again</button>
                            </div>
                        </div>
                    </div>
                <br></br>
               
                <div className="container justify-content-center text-center">
                    <div className="row " id='playerNames'>
                    {tiebreaker ? renderPlayersTiebreaker(numOfSuddenPlayers) : renderPlayers(numOfPlayers)}
                    </div>
                </div>   
                <br/><br/>             
            </>
    
}

export default GamePage;
