
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QuestionCard } from '../../components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GamePage = () => {

    //const { results } = useParams();

    const[questions, setQuestions] = useState([]); 

    const[counter, setCounter] = useState(0);

    //const[score, setScore] = useState(0);

    //const[question, setQuestion] = useState({})

    const categoryID = useSelector(state => state.categoryID);
    const numOfTurns = useSelector(state => state.numOfTurns);
    const difficulty = useSelector(state => state.difficulty);

    useEffect( () => {
    
    async function getQuestions () {

            try {
                //const result = await axios.get(`https://opentdb.com/api.php?amount=${numOfTurns}&category=${categoryID}&difficulty=${difficulty.toLowerCase()}&type=multiple`);
                const result = await axios.get(`https://opentdb.com/api.php?amount=2&category=9&difficulty=easy&type=multiple`);
                //console.log(result.data.results)
                setQuestions(result.data.results);
                
                
            } catch(err) {
                console.error(err);
            }
       
        }
        getQuestions();
    
    }, [])
    
    const question = questions[counter]

    let newScore = 0;

    const handleClick = (e) => {      
        document.getElementById('correctCard').disabled = true;
        document.getElementById('correct').disabled = true;
        document.getElementById(`card0`).disabled = true;
        document.getElementById(`0`).disabled = true;
        document.getElementById(`card1`).disabled = true;
        document.getElementById(`2`).disabled = true;
        document.getElementById(`card2`).disabled = true;
        document.getElementById(`2`).disabled = true;
        const buttonClicked = e.target.id;
        console.log("this one being clicked, ", buttonClicked)
        const theID = e.target.id.slice(-1);
        if (buttonClicked === "correctCard" || buttonClicked === "correct") {
            document.getElementById('correctCard').style.backgroundColor = '#0F0';
            document.getElementById('correctCard').style.fontWeight = 'bold';
            newScore += 1;
            
        } else {
            document.getElementById(`card${theID}`).style.backgroundColor = '#F00';
            document.getElementById(`card${theID}`).style.fontWeight = 'bold';          
        }
        console.log('SCORE: ', newScore)

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
                clearTimeout(myTimeout2);
                setCounter(prev => prev + 1) 
                if (counter + 1  >= quizLength) {
                    document.getElementById('over').textContent =  'Thanks For Playing';
                    document.getElementById('score').textContent =  `Your Score Was: ${score}`;
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
                clearTimeout(myTimeout3);
                setCounter(prev => prev + 1)
                if (counter + 1  >= quizLength) {
                    console.log("done")
                    document.getElementById('over').textContent =  'Thanks For Playing';
                    document.getElementById('score').textContent =  `Your Score Was: ${score}`;
                }
            }                    
        }     
               
    }   

    const quizLength = questions.length;

    function renderIncorrectAnswers () {
        let arr = [];
        
        console.log("quizLength: " , quizLength)
        let currentQuestion = 0;
        for (let index = 0; index < question.incorrect_answers.length; index++) {
            arr.push(   
                    <div id={index} className="card answer-card naked">
                        <button id={`card${index}`} onClick={handleClick} className="naked">
                            <div id={index} className="card-body text-center">
                                <p id={index} className="card-text">{question.incorrect_answers[index].replace(regQuotes, '"').replace(regApost, '’').replace(funnyI, 'í').replace(funnyO,'ö').replace(aRing, 'å').replace(funnyA, 'ä').replace(funnyO2, 'ó').replace(softHyphen, '').replace(funnyA2, 'á').replace(funnyE, 'é').replace(andSymb, '&')}</p>
                            </div>
                        </button>
                    </div>)  
        } 
        arr.push(   
                <div id="correct" className="card answer-card naked">
                    <button id='correctCard'  onClick={handleClick} className="naked">
                        <div id="correct"  className="card-body text-center">
                            {question && <p id="correct" >{question.correct_answer.replace(regQuotes, '"').replace(regApost, '’').replace(funnyI, 'í').replace(funnyO,'ö').replace(aRing, 'å').replace(funnyA, 'ä').replace(funnyO2, 'ó').replace(softHyphen, '').replace(funnyA2, 'á').replace(funnyE, 'é').replace(andSymb, '&')}</p>}
                        </div>
                    </button>
                </div>
                )
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
    // const p = "Bogot&aacute;"
    // console.log(p.replace(funnyA2, 'á'))

    return <>
                <div className="jumbotron text-center" id="title">
                <br/><br/>
                    <h1 id="titleH1">Let's go!</h1>
                    <br/>
                </div>
                <br></br>
                <div className="container-fluid justify-content-center text-center">
                    <div className="row ">
                        <div className="col-sm-12 ">
                            {question && <h3>{question.question.replace(regQuotes, '"').replace(regApost, '’').replace(funnyI, 'í').replace(funnyO,'ö').replace(aRing, 'å').replace(funnyA, 'ä').replace(funnyO2, 'ó').replace(softHyphen, '').replace(funnyA2, 'á').replace(funnyE, 'é').replace(andSymb, '&')}</h3>}
                        </div>
                    </div>
                </div>
                <div className="card-deck answers">
                        {question && renderIncorrectAnswers()}
                </div> 
                <div className="container-fluid justify-content-center text-center">
                    <div className="row ">
                            <div className="col-sm-12 ">
                                <h3 id='over'></h3>
                                <h3 id='score'></h3>
                            </div>
                        </div>
                    </div>
                <br></br>
            </>
    
}

export default GamePage;

