import React from 'react';
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {

    const navigate = useNavigate();

    function handleClick() {
        navigate('/options')
    }
       
    return (
        <>
        <div className="jumbotron text-center" id="title">
            <h1 id="titleH1">Trivia Quiz</h1>
            <br/>
        </div>
        <br/>
        <div className="container-fluid justify-content-center text-center">
            <div className="row ">
                <div className="col-sm-12 ">
                    <button onClick={handleClick} id='cardBtn'>Play</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default IndexPage;