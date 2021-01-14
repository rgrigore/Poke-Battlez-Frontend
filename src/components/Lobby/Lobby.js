import React, {useState} from "react";

import LobbyNavbar from "./layout/LobbyNavbar";
import Chat from "./Chat";
import RegisterModal from "./account/RegisterModal";

function Lobby() {
    const [registered, setRegistered] = useState(false);
    return(
        <div className={"Lobby"}>
            <LobbyNavbar />
            <Chat />
            <RegisterModal open={!registered} onClose={() => setRegistered(true)} />
        </div>
    );
}

export default Lobby;