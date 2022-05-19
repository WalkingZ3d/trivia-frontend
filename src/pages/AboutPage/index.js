import React from 'react';

const AboutPage = () => {
    
    return (
        <>
        <div className="jumbotron text-center" id="title">
            <h1 id="titleH1">Welcome to Neweet's Trivia Game!</h1>
        </div>
        <br/><br/>
        <div className="container-fluid justify-content-center text-center">
            <div className="row ">
                <div className="col-sm-12 " id='aboutInfo'>
                    <h4>To play the game, press the <a href='/' id='playLink'>play button</a> in the navigation bar and the large button in the middle of the home page!</h4>

                    <br/>
                    <h4 id='optionsInfoH4'>Pick the options for your game:</h4>
                    <p id='infoLi'>Each game can have up to <span id='infoLiSpan'>4</span> players</p>
                    <p id='infoLi'>Choose from <span id='infoLiSpan'>1</span> of 23 categories</p>
                    <p id='infoLi'>Each player can have up to <span id='infoLiSpan'>10</span> questions</p>
                    <p id='infoLi'>Choose <span id='infoLiSpan'>difficulty</span></p>
                    <p id='infoLi'>Press <span id='infoLiSpan'>Next</span> to move on</p>
                    <p id='infoLi'>Give each player a  <span id='infoLiSpan'>name</span></p>
                    <p id='infoLi'>Press <span id='infoLiSpan'>Next</span> to move on</p>
                    
                    <br/>
                    <h4>Playing the game:</h4>
                    <p id='infoLi'>Each round has a <span id='infoLiSpan'>random</span> question from the parameters you picked for each player</p>
                    <p id='infoLi'>Choose from <span id='infoLiSpan'>1</span> of 4 possible answers</p>
                    <p id='infoLi'>If you are correct, the card will flash <span id='infoLiSpan'>green</span></p>
                    <p id='infoLi'>If you are incorrect, the card will flash <span id='infoLiSpanRed'>red</span> and then the correct answer will flash<span id='infoLiSpanCyan'> blue</span></p>
                    <p id='infoLi'>Correct answers will incrmement that players score by <span id='infoLiSpan'>1</span></p>
                    <p id='infoLi'>Check the  <span id='infoLiSpan'>top</span> of the page above the question to see which player is next</p>
                    <p id='infoLi'>After every player has answered all of their questions, if there is a <span id='infoLiSpan'>winner</span>, that is shown</p>
                    <p id='infoLi'>Click <span id='infoLiSpan'>play again</span> to start over!</p>

                    <br/>
                    <h4>In event of tiebreaker:</h4>
                    <p id='infoLi'>A new <span id='infoLiSpan'>sudden death question</span> is generated</p>
                    
                </div>
            </div>
        </div>
    </>
    )
}

export default AboutPage;