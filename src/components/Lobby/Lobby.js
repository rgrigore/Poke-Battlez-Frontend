import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import LobbyNavbar from "./layout/LobbyNavbar";
import Chat from "./Chat";
import RegisterModal from "./account/RegisterModal";
import { connect } from "../../controller/AccountController";
import { UserContextProvider } from "./account/UserContext";
import TeamModal from "./team/TeamModal";

function Lobby() {
    const [registered, setRegistered] = useState(false);
    const [first, setFirst] = useState(true);

    const [showTeam, setShowTeam] = useState(false);

    if (first) {
	    connect();
	    setFirst(false);
    }

    return(
        <div className={"Lobby vh-100"}>
            <UserContextProvider>
                <LobbyNavbar openTeam={() => setShowTeam(true)} />
                <Chat />
                {/*<RegisterModal open={!registered} onClose={() => setRegistered(true)} />*/}
                <TeamModal open={showTeam} onClose={() => setShowTeam(false)} />
            </UserContextProvider>
        </div>
    );
}

export default Lobby;