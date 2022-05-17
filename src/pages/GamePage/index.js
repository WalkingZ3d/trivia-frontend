
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QuestionCard } from '../../components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GamePage = () => {

    //const { results } = useParams();

    const[questions, setQuestions] = useState([]); 

    const categoryID = useSelector(state => state.categoryID);
    const numOfTurns = useSelector(state => state.numOfTurns);
    const difficulty = useSelector(state => state.difficulty);

    console.log( numOfTurns, categoryID, difficulty.toLowerCase())

    useEffect( () => {
    
    async function getQuestions () {

        try {
            const result = await axios.get(`https://opentdb.com/api.php?amount=${numOfTurns}&category=${categoryID}&difficulty=${difficulty.toLowerCase()}&type=multiple`);
           // const result = await axios.get(`https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple`);
           console.log(result.data.results)
            setQuestions(result.data.results);
            
            
        } catch(err) {
            console.error(err);
        }
       
     }
     getQuestions();

   
}, [])

    const question = questions[0];


    const handleClick = (e) => {
       
       const buttonClicked = e.target.id
        console.log(e.target.id)
        if (buttonClicked === "correct") {
            e.target.style.backgroundColor = "green"
        } else {
            e.target.style.backgroundColor = "red"
        }

    }    

    function renderIncorrectAnswers () {
        let arr = [];

        for (let index = 0; index < question.incorrect_answers.length; index++) {
            
            arr.push(   <div id={index} className="card answer-card naked">
                            <button id={index} onClick={handleClick} className="naked">
                                <div id={index} className="card-body text-center">
                                    <p id={index} className="card-text">{question.incorrect_answers[index].replace(regQuotes, '"').replace(regApost, '’').replace(funnyI, 'í').replace(funnyO,'ö').replace(aRing, 'å').replace(funnyA, 'ä').replace(funnyO2, 'ó').replace(softHyphen, '').replace(funnyA2, 'á').replace(funnyE, 'é').replace(andSymb, '&')}</p>
                                </div>
                            </button>
                        </div>)                                                                            
        } 
            arr.push(   
                    <div id="correct" className="card answer-card naked">
                        <button id="correct"  onClick={handleClick} className="naked">
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
      <br></br>
        </>
    
}

export default GamePage;

