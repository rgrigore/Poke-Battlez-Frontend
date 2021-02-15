import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Lobby from "./lobby/Lobby";
import BattlePage from "./battle/BattlePage";

function Main() {
    return (
        <Router>
            <div className="Main">
                <Route exact path={"/lobby"}>
                    <Lobby />
                </Route>
                <Route exact path={"/battle"}>
                    <BattlePage />
                </Route>
            </div>
        </Router>
    );
}

export default Main;
