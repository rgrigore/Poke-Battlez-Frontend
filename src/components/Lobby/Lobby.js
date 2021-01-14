import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className={"Lobby vh-100"}>
            <UserContextProvider>
                <LobbyNavbar />
                <Chat />
                <RegisterModal open={!registered} onClose={() => setRegistered(true)} />
            </UserContextProvider>
        </div>
    );
}

export default Lobby;