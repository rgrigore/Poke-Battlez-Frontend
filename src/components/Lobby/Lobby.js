import React, {useState} from "react";

import LobbyNavbar from "./layout/LobbyNavbar";
import Chat from "./Chat";
import RegisterModal from "./account/RegisterModal";
import { connect } from "../../controller/AccountController";

function Lobby() {
    const [registered, setRegistered] = useState(false);
    const [first, setFirst] = useState(true);

    if (first) {
	    connect();
	    setFirst(false);
    }

    return(
        <div className={"Lobby"}>
            <LobbyNavbar />
            <Chat />
            <RegisterModal open={!registered} onClose={() => setRegistered(true)} />
        </div>
    );
}

export default Lobby;