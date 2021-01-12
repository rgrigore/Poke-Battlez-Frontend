import React from "react";

import LobbyNavbar from "./layout/LobbyNavbar";
import Chat from "./Chat";

function Lobby() {
    return(
        <div className={"Lobby"}>
            <LobbyNavbar />
            <Chat />
        </div>
    );
}

export default Lobby;