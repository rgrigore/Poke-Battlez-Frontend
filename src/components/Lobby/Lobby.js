import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import LobbyNavbar from "./layout/LobbyNavbar";
import Chat from "./Chat";
import {connect} from "../../controller/AccountController";
import {UserContextProvider} from "./account/UserContext";
import TeamModal from "./team/TeamModal";
import RegisterModal from "./account/RegisterModal";

function Lobby() {
    const [registered, setRegistered] = useState(false);
    const [first, setFirst] = useState(true);

    const [showTeam, setShowTeam] = useState(false);
    const[team, setTeam] = useState(null);

    if (first) {
	    connect();
	    setFirst(false);
    }

    return(
        <div className={"Lobby vh-100"}>
            <UserContextProvider>
                <LobbyNavbar openTeam={() => setShowTeam(true)} />
                <Chat setTeam={(newTeam) => setTeam(newTeam)}/>
                <RegisterModal open={!registered} onClose={() => setRegistered(true)} />
                <TeamModal open={showTeam} onClose={() => setShowTeam(false)} theTeam={team}/>
            </UserContextProvider>
        </div>
    );
}

export default Lobby;