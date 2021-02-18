import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Lobby from "./lobby/Lobby";

function Main() {
    return (
        <Router>
            <div className="Main">
                <Route exact path={"/lobby"}>
                    <Lobby />
                </Route>
            </div>
        </Router>
    );
}

export default Main;
