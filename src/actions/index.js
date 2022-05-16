const loadNumOfPlayers = ({ numOfPlayers}) => ({ 
    type: 'LOAD_PLAYERS',
    payload: numOfPlayers
});

export const getNumOfPlayers = numOfPlayers => {
    try {           
        dispatch(loadNumOfPlayers(numOfPlayers));
    } catch (err) {
        console.warn(err.message);
        dispatch({ type: 'SET_ERROR', payload: err.message })
    };
};

const loadCategory = ({ category }) => ({ 
    type: 'LOAD_PLAYERS',
    payload: category
});

export const getCategory = category => {
    try {           
        dispatch(loadCategory(category));
    } catch (err) {
        console.warn(err.message);
        dispatch({ type: 'SET_ERROR', payload: err.message })
    };
};

const loadNumOfTurns = ({ numOfTurns }) => ({ 
    type: 'LOAD_PLAYERS',
    payload: numOfTurns
});

export const getNumOfTurns = numOfTurns => {
    try {           
        dispatch(loadNumOfTurns(numOfTurns));
    } catch (err) {
        console.warn(err.message);
        dispatch({ type: 'SET_ERROR', payload: err.message })
    };
};

const loadDifficulty = ({ difficulty }) => ({ 
    type: 'LOAD_PLAYERS',
    payload: difficulty
});

export const getDifficulty= difficulty => {
    try {           
        dispatch(loadDifficulty(difficulty));
    } catch (err) {
        console.warn(err.message);
        dispatch({ type: 'SET_ERROR', payload: err.message })
    };
};