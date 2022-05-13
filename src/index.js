import React from 'react';
import reactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store';

import App from "./App";

// reactDom.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <Router>
//                 <App />
//             </Router>
//         </Provider>
//     </React.StrictMode>,
//     document.getElementById("root"));


reactDom.render(
    <React.StrictMode>
            <Router>
                <App />
            </Router>
    </React.StrictMode>,
    document.getElementById("root"));