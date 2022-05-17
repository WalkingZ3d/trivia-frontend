
const initState = { numOfPlayers: 0, category: "", categorgyID: 0, numOfTurns: 0, difficulty: "", player1: "", player2: "", player3: "", player4: ""};

const searchReducer = (state=initState, action) => {
    //console.log("incoming payload: ", action.payload)

    switch(action.type){
        case 'LOAD_PLAYERS':
            return { ...state, numOfPlayers: action.payload};
        case 'LOAD_CATEGORY':
            return { ...state, category: action.payload};
        case 'LOAD_CATEGORY_ID':
            return { ...state, categoryID: action.payload};
        case 'LOAD_TURNS':
            return { ...state, numOfTurns: action.payload};
        case 'LOAD_DIFFICULTY':
            return { ...state, difficulty: action.payload};
        case 'ADD_PLAYER1':
            return { ...state, player1: action.payload};
        case 'ADD_PLAYER2':
            return { ...state, player2: action.payload};
        case 'ADD_PLAYER3':
            return { ...state, player3: action.payload};
        case 'ADD_PLAYER4': 
            return { ...state, player4: action.payload};
        case 'SET_ERROR':
            return { ...state, error: action.payload}
        default :
            return state
    };
};



export default searchReducer;