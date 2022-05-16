import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { optionsReducer } from './reducers';

const store = createStore(optionsReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;