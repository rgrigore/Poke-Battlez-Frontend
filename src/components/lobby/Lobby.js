import React, {useContext, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import styled, { css } from "styled-components";
import LoadingOverlay from 'react-loading-overlay';
import "../../css/Loader.css"

import LobbyNavbar from "./layout/LobbyNavbar";
import Chat from "./Chat";
import {connect as connectLobby, isConnected} from "../../controller/ChatController";
import TeamModal from "./team/TeamModal";
import RegisterModal from "./account/RegisterModal";
import UserModal from "./UserModal";
import ChallengeModal from "./ChallengeModal";
import {UserContext} from "./account/UserContext";

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${(props) =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

function Lobby() {
    const [battleLoading, setBattleLoading] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [first, setFirst] = useState(true);

    const [showTeam, setShowTeam] = useState(false);

    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [users, setUsers] = useState([]);

    let [chatMessages, setChatMessages] = useState([]);
    let [newMessage, setNewMessage] = useState(null);

    const [showChallengeModal, setShowChallengeModal] = useState(false);
    const [challenger, setChallenger] = useState(null);

    const userContext = useContext(UserContext);

    const history = useHistory();

    const changeRoute = newRoute => {
        history.push(newRoute);
    }

    if (first && registered) {
        connectLobby(setUsers, setNewMessage, setChallenger, setShowChallengeModal, changeRoute, userContext.user.id, setBattleLoading);
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
            <LobbyNavbar openTeam={() => setShowTeam(true)} />
            <Chat users={users} openUser={() => setShowUserModal(true)} selectUser={setSelectedUser} messages={chatMessages} />
            <RegisterModal open={!registered} onClose={() => setRegistered(true)} />
            { registered && isConnected() &&
                <>
                    <TeamModal open={showTeam} onClose={() => setShowTeam(false)} />
                    <UserModal open={showUserModal} close={() => setShowUserModal(false)} listUser={selectedUser} />
                    <ChallengeModal open={showChallengeModal} close={() => setShowChallengeModal(false)}
                                    challenger={challenger} setChallenger={(value) => setChallenger(value)}
                                    loader={() => setBattleLoading(true)}
                    />
                </>
            }
            <DarkBackground disappear={battleLoading}>
                <LoadingOverlay
                    active={battleLoading}
                    spinner
                    text="Loading battle..."
                />
            </DarkBackground>
        </div>
    );
}

export default Lobby;