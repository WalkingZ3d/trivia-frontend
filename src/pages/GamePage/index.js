import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QuestionCard } from '../../components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GamePage = () => {

    //const { results } = useParams();

    const[questions, setQuestions] = useState([]); 

    const numOfPlayers = useSelector(state => state.numOfPlayers);
    const category = useSelector(state => state.category);
    const numOfTurns = useSelector(state => state.numOfTurns);
    const difficulty = useSelector(state => state.difficulty);

    useEffect( () => {
    
    async function getQuestions () {

        try {
           // const result = await axios.get(`https://opentdb.com/api.php?amount=${numOfTurns}&category=${category}&difficulty=${difficulty}&type=multiple`);
            const result = await axios.get(`https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple`);
           
            setQuestions(result.data.results);
            
            
        } catch(err) {
            console.error(err);
        }
       
     }
     getQuestions();

   
}, [])

    const question = questions[0];

   // const renderQuestion = () => questions.map((q, i) => <h3 key={i}>{q.question}</h3>)
   // const renderAnswer = () => questions.map((q, i) => <p key={i}>{q.correct_answer}</p>)

   //const renderIncorrectAnswers = () => question.incorrect_answers.map((q, i) =>  <li>{q}</li>)

   function renderIncorrectAnswers () {
        let arr = [];

    for (let index = 0; index < question.incorrect_answers.length; index++) {
        
        arr.push(   <div className="card answer-card">
                        <div className="card-body text-center">
                        <p className="card-text">{question.incorrect_answers[index].replace(regQuotes, '"').replace(regApost, '’').replace(funnyI, 'í').replace(funnyO,'ö').replace(aRing, 'å').replace(funnyA, 'ä')}</p>
                        </div>
                    </div>)                             
                                                    
   } 
        arr.push(   <div className="card answer-card bg-danger">
                        <div className="card-body text-center">
                        {question && <p>{question.correct_answer.replace(regQuotes, '"').replace(regApost, '’').replace(funnyI, 'í').replace(funnyO,'ö').replace(aRing, 'å').replace(funnyA, 'ä')}</p>}
                        </div>
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

    

   // const renderQuestionCards = () => questions.map((q, i) => <QuestionCard key={i} question = {q.question} answer = {q.correct_answer} />)

    const regQuotes = /\&quot;|\&ldquo;|\&rdquo;/g;
    //const regDQoutes = /\&ldquo;/g;
    const regApost = /\&#039;/g;
    const funnyI = /\&iacute;/g;
    const funnyO = /\&ouml;/g;
    const aRing = /\&aring;/g;
    const funnyA = /\k&auml;/g;
    const q = "Sk&auml;rm"
    console.log(q.replace(funnyA, 'ä'))
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
                {question && <h3>{question.question.replace(regQuotes, '"').replace(regApost, '’').replace(funnyI, 'í').replace(funnyO,'ö').replace(aRing, 'å').replace(funnyA, 'ä')}</h3>}
                </div>
            </div>
        </div>
        <div className="card-deck answers">
                {question && renderIncorrectAnswers()}
        </div> 
      <br></br>
        
        {/* <QuestionCard questions={questions} />  */}

        </>
    
}

export default GamePage;