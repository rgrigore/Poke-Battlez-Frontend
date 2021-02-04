import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import LobbyNavbar from "./layout/LobbyNavbar";
import Chat from "./Chat";
import {connect as connectAccount} from "../../controller/AccountController";
import {connect as connectLobby, isConnected} from "../../controller/ChatController";
import {UserContextProvider} from "./account/UserContext";
import TeamModal from "./team/TeamModal";
import RegisterModal from "./account/RegisterModal";
import UserModal from "./UserModal";

function Lobby() {
    const [registered, setRegistered] = useState(false);
    const [first, setFirst] = useState(true);

    const [showTeam, setShowTeam] = useState(false);
    const [updatedTeam, setUpdatedTeam] = useState(null);

    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [users, setUsers] = useState([]);

    let [chatMessages, setChatMessages] = useState([]);
    let [newMessage, setNewMessage] = useState(null);

    if (!registered) {
        connectAccount();
    }

    if (first && registered) {
        connectLobby(setUsers, setUpdatedTeam, setNewMessage);
        setFirst(false);
    }

    useEffect(() => {
        if (newMessage !== null) {
            setChatMessages([...chatMessages, newMessage]);
        }
        // eslint-disable-next-line
    }, [newMessage]);

    return(
        <div className={"Lobby vh-100"}>
            <UserContextProvider>
                <LobbyNavbar openTeam={() => setShowTeam(true)} />
                <Chat users={users} openUser={() => setShowUserModal(true)} selectUser={setSelectedUser} messages={chatMessages} />
                <RegisterModal open={!registered} onClose={() => setRegistered(true)} />
                { registered && isConnected() &&
                    <>
                        <TeamModal open={showTeam} onClose={() => setShowTeam(false)} updatedTeam={updatedTeam} />
                        <UserModal open={showUserModal} close={() => setShowUserModal(false)} listUser={selectedUser} />
                    </>
                }
            </UserContextProvider>
        </div>
    );
}

export default Lobby;