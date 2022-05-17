import React from 'react';


function QuestionCard ({questions}) {

    //const incorrectAnswers = questions.incorrect_answers
   // console.log("incorrect answers array:", incorrectAnswers);

    const renderQuestion = () => questions.map((q, i) => <h3 key={i}>{q.question}</h3>)
    const renderAnswer = () => questions.map((q, i) => <p key={i}>{q.correct_answer}</p>)
   
    const renderIncorrectAnswers = () => questions.map((q, i) =>  {      
                                                                    <div className="card bg-warning">
                                                                    <div className="card-body text-center">
                                                                    <p className="card-text">{q.incorrect_answers}</p>
                                                                    </div>
                                                                    </div>})


    console.log("question:",questions);
    return (
        <>
        {renderQuestion()}
        <div className="card-deck">
        <div className="card bg-primary">
          <div className="card-body text-center">
            {renderAnswer()}
          </div>
          {renderIncorrectAnswers()}
        </div>
        </div> 
        </> 
    
        // <div className="card">
        //     {renderQuestion()}
        //     {renderAnswer()}
        //     {renderIncorrectAnswers()}
        // </div>

    );
    
}

export default QuestionCard;


