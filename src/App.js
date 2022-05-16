import React from "react";
import {Routes, Route } from "react-router-dom";
import {IndexPage, NotFoundPage, AboutPage, ExamplePage, OptionsPage, PlayersPage, GamePage } from "./pages";
import {default as Layout} from "./layouts";
import './App.css';

const App = () => {
    return <Routes>
            <Route path="/" element={<Layout />}>                
                <Route path="/">
                    <Route path="/" element={<IndexPage />} />
                        <Route path="options" element={<OptionsPage />}/>
                            <Route path="/options/players" element={<PlayersPage />}/>
                                <Route path="/options/players/game"  element={<GamePage />}/>
                </Route>
                <Route path="/example" element={<ExamplePage />}/>           
                <Route path="/about" element={<AboutPage />}/>  
                <Route path="*" element={<NotFoundPage />}/>
            </Route>
           </Routes>
}

export default App;