import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {sendPrivate, sendChallenge} from "../../controller/ChatController";

function UserModal({ open, close, listUser }) {
    const[message, setMessage] = useState("");
    const[user, setUser] = useState({id: -1, name: ""});

    useEffect(() => {
        setUser(listUser);
    }, [listUser]);

    const setNewMessage = (e) => {
        const newMessage = e.target.value;
        setMessage(newMessage);
    };

    const sendMessage = () => {
        if(message !== "") {
            sendPrivate(user.id, message);
        }
    };

    return(
        <Modal show={open} onHide={close} size="sm" aria-labelledby="pm-modal" style={{paddingTop: "12rem"}} >
            <Modal.Header style={{backgroundColor: '#828991'}}>
                <h4>{user.name}</h4>
            </Modal.Header>
            <Modal.Body  style={{backgroundColor: '#9ea8b1'}}>
                <input id="pm-message" type="text" name="text" className="border rounded form-control"
                       placeholder="Type a message..." onChange={setNewMessage} />
                <button onClick={sendMessage}>Send</button>
                <button onClick={() => sendChallenge(user)}>Challenge</button>
            </Modal.Body>
        </Modal>
    );
}

export default UserModal;