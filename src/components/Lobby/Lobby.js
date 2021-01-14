import React, {useState} from "react";

import LobbyNavbar from "./layout/LobbyNavbar";
import Chat from "./Chat";
import Modal from "./Modal";

function Lobby() {
    const [registered, setRegistered] = useState(false);
    return(
        <div className={"Lobby"}>
            <LobbyNavbar />
            {/*<Chat />*/}
            <Modal open={!registered} onClose={() => setRegistered(true)} />
        </div>
    );
}

export default Lobby;