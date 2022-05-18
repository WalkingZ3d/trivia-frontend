import React from "react";
import {Routes, Route } from "react-router-dom";
import {IndexPage, NotFoundPage, AboutPage, ExamplePage, OptionsPage, PlayersPage, GamePage, HighScorePage } from "./pages";
import {default as Layout} from "./layouts";
import './App.css';

const App = () => {
    return <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/">
                    <Route path="/" element={<IndexPage />} />
                    <Route path="/highscore" element={<HighScorePage />} />
                        <Route path="options" element={<OptionsPage />}/>
                            <Route path="/options/players" element={<PlayersPage />}/>
                                <Route path="/options/players/game"  element={<GamePage />}/>
                </Route>
                <Route path="/about" element={<AboutPage />}/>
                <Route path="*" element={<NotFoundPage />}/>
            </Route>
           </Routes>
}
export default App;