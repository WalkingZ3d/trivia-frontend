const initState = { numOfPlayers: 0, category: "", numOfTurns: 0, difficulty: ""};

const searchReducer = (state=initState, action) => {
    //console.log(action.payload)
    switch(action.type){
        case 'LOAD_PLAYERS':
            return { ...state, numOfPlayers: action.payload};
        case 'LOAD_CATEGORY':
            return { ...state, category: action.payload};
        case 'LOAD_TURNS':
            return { ...state, numOfTurns: action.payload};
        case 'LOAD_DIFFICULTY':
            return { ...state, difficulty: action.payload};
        case 'SET_ERROR':
            return { ...state, error: action.payload}
        default :
            return state
    };
};



export default searchReducer;