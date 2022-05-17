// Num of players
const loadNumOfPlayers = numOfPlayers => ({ type: 'LOAD_PLAYERS', payload: numOfPlayers });
export const getNumOfPlayers = numOfPlayers => {
    return async dispatch => {
        try {
            dispatch(loadNumOfPlayers(numOfPlayers));
        } catch (err) {
            console.warn(err.message);
            dispatch({ type: 'SET_ERROR', payload: err.message })
        };
    };
};
// Category
const loadCategory = category => ({ type: 'LOAD_CATEGORY', payload: category });
export const getCategory = category => {
    return async dispatch => {
        try {
            dispatch(loadCategory(category));
        } catch (err) {
            console.warn(err.message);
            dispatch({ type: 'SET_ERROR', payload: err.message })
        };
    };
};
// Category ID
const loadCategoryID = categoryID => ({ type: 'LOAD_CATEGORY_ID', payload: categoryID });
export const getCategoryID = categoryID => {
    return async dispatch => {
        try {
            dispatch(loadCategoryID(categoryID));
        } catch (err) {
            console.warn(err.message);
            dispatch({ type: 'SET_ERROR', payload: err.message })
        };
    };
};
// Num of turns
const loadNumOfTurns = getNumOfTurns => ({ type: 'LOAD_TURNS', payload: getNumOfTurns });
export const getNumOfTurns = getNumOfTurns => {
    return async dispatch => {
        try {
            dispatch(loadNumOfTurns(getNumOfTurns));
        } catch (err) {
            console.warn(err.message);
            dispatch({ type: 'SET_ERROR', payload: err.message })
        };
    };
};
// Difficulty
const loadDifficulty = difficulty => ({ type: 'LOAD_DIFFICULTY', payload: difficulty });
export const getDifficulty = difficulty => {
    return async dispatch => {
        try {
            dispatch(loadDifficulty(difficulty));
        } catch (err) {
            console.warn(err.message);
            dispatch({ type: 'SET_ERROR', payload: err.message })
        };
    };
};
// Add player1 to the game
const loadPlayer1 = player1 => ({ type: 'ADD_PLAYER1', payload: player1 });
export const getPlayer1 = player1 => {
    return async dispatch => {
        try {
            dispatch(loadPlayer1(player1));
        } catch (err) {
            console.warn(err.message);
            dispatch({ type: 'SET_ERROR', payload: err.message })
        };
    };
};
// Add player2 to the game
const loadPlayer2 = player2 => ({ type: 'ADD_PLAYER2', payload: player2 });
export const getPlayer2 = player2 => {
    return async dispatch => {
        try {
            dispatch(loadPlayer2(player2));
        } catch (err) {
            console.warn(err.message);
            dispatch({ type: 'SET_ERROR', payload: err.message })
        };
    };
};
// Add player3 to the game
const loadPlayer3 = player3 => ({ type: 'ADD_PLAYER3', payload: player3 });
export const getPlayer3 = player3 => {
    return async dispatch => {
        try {
            dispatch(loadPlayer3(player3));
        } catch (err) {
            console.warn(err.message);
            dispatch({ type: 'SET_ERROR', payload: err.message })
        };
    };
};
// Add player4 to the game
const loadPlayer4 = player4 => ({ type: 'ADD_PLAYER4', payload: player4 });
export const getPlayer4 = player4 => {
    return async dispatch => {
        try {
            dispatch(loadPlayer4(player4));
        } catch (err) {
            console.warn(err.message);
            dispatch({ type: 'SET_ERROR', payload: err.message })
        };
    };
};