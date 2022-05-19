import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {

    const navigate = useNavigate();

    function handleClick() {
        navigate('/')
    }

    return (
        <div className="lmao">
            <div className="jumbotron text-center" id="notFound">
                <h1 id="titleNotFound">404 - Not Found!</h1>
                <br/>
                <button onClick={handleClick} id='cardBtn'>Home</button>
            </div>
        </div>        
    )
}

export default NotFoundPage;