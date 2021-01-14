import React, {useState} from "react";

import LobbyNavbar from "./layout/LobbyNavbar";
import Chat from "./Chat";
import RegisterModal from "./account/RegisterModal";
import { connect } from "../../controller/AccountController";
import { UserContextProvider } from "./account/UserContext";

function Lobby() {
    const [registered, setRegistered] = useState(false);
    const [first, setFirst] = useState(true);

    if (first) {
	    connect();
	    setFirst(false);
    }

    return(
        <div className={"Lobby"}>
            <UserContextProvider>
                <LobbyNavbar />
                <Chat />
                <RegisterModal open={!registered} onClose={() => setRegistered(true)} />
            </UserContextProvider>
        </div>
    );
}

export default Lobby;