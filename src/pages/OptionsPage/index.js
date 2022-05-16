import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getNumOfPlayers, getCategory, getNumOfTurns, getDifficulty } from '../../actions';

const OptionsPage = () => {

    const dispatch = useDispatch();

    const numPlayers = useSelector(state => state.numOfPlayers);
    const category = useSelector(state => state.category);
    const numTurns = useSelector(state => state.numTurns);
    const difficulty = useSelector(state => state.difficulty);

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getCategories() {
            try {
                const {data} = await axios.get(`https://opentdb.com/api_category.php`);
                const categoriesRetrived = data.trivia_categories;
                let arr = [];
                categoriesRetrived.forEach(category => {
                    arr.push(category.name);
                })
                setCategories(arr);                
            } catch (err) {
                console.error(err);
            }        
        }  
        getCategories(); 
        console.log("store says: ", numPlayers);  
    },[])

    function handleSubmit(e) {
        e.preventDefault();
        let numPlayers = document.getElementById('numPlayers').value;
        let category = document.getElementById('category').value;
        let numTurns = document.getElementById('numTurns').value;
        let difficulty = document.getElementById('difficulty').value;
        console.log(numPlayers, category, numTurns, difficulty)
        let search = formInp => dispatch(getNumOfPlayers(numPlayers));
        navigate('/options/players');
    }

    function renderCategories() {
        return categories.map((s,i) => <option className={'categoriesOptions'} key={i}>{s}</option>)
    }
    
       
    return (
        <>
        <div className="jumbotron text-center" id="title">
            <h1 id="titleH1">Pick The Options</h1>
            <br/>            
        </div>
        <br/>        
        <div className="container-fluid justify-content-center text-center">
            <div className="row ">
                <div className="col-sm-12 ">
                <form onSubmit={handleSubmit} role="form"> 
                    <label htmlFor="numPlayers" className='optionsLabel'>Number of Players: </label>
                    <input type="number" id='numPlayers' name='numPlayers' className='optionsInp' min='1' max='4' defaultValue='1'/>
                    <br/><br/>
                    <label htmlFor="category" className='optionsLabel'>Category:</label>
                    <select type="text" id='category' name='category' className='optionsInp'>
                        {renderCategories()}
                    </select>
                    <br/><br/>
                    <label htmlFor="numTurns" className='optionsLabel'>Number of Turns: </label>
                    <input type="number" id='numTurns' name='numTurns' className='optionsInp' min='1' max='20' defaultValue='1'/>
                    <br/><br/>
                    <label htmlFor="difficulty" className='optionsLabel'>Difficulty: </label>
                    <select type="text" id='difficulty' name='difficulty' className='optionsInp'>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                        <option>Any</option>
                    </select>
                    <br/><br/>
                    <input type='submit' value='Next' id='cardBtn'/>
                </form>
                </div>
            </div>
            <br/>            
        </div>
    </>
    )
}

export default OptionsPage;