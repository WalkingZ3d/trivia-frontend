import React from "react";
import {Routes, Route } from "react-router-dom";
import {IndexPage, NotFoundPage, AboutPage } from "./pages";
import {default as Layout} from "./layouts";
import './App.css';

const App = () => {
    return <Routes>
            <Route path="/" element={<Layout />}>                
                <Route path="/">
                    <Route path="/" element={<IndexPage />} />
                </Route>
                <Route path="/about" element={<AboutPage />}/>  
                <Route path="*" element={<NotFoundPage />}/>
            </Route>
           </Routes>
}

export default App;