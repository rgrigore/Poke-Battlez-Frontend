import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Lobby from "./lobby/Lobby";
import BattlePage from "./battle/BattlePage";
import {UserContextProvider} from "./lobby/account/UserContext";

function Main() {
    return (
        <UserContextProvider>
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
        </UserContextProvider>
    );
}

export default Main;
