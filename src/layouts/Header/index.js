import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => {
    return (
        <>
            <nav className="navbar sticky-top navbar-expand-md navbar-dark justify-content-center" id="top">
                <div className="container-md d-flex" id="containerNavId">
                    
                    <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" id="hamburgerButton">
                <span className="navbar-toggler-icon"></span>            
            </button>
                    <div className="collapse navbar-collapse justify-content-center " id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <NavLink className="nav-link active" id='navItem' to='/'>Home</NavLink>
                            </li>                   
                            <li className="nav-item">
                            <NavLink className="nav-link active" id='navItem' to='/about'>About</NavLink> 
                            </li>           
                            <li className="nav-item">
                            <NavLink className="nav-link active" id='navItem' to='/highscore'>High Scores</NavLink>
                            </li>  
                        </ul>
                    </div>
                </div>      
            </nav> 
        </>
    )
}

export default Header;