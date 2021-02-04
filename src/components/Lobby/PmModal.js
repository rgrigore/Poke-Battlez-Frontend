import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import {sendPrivate} from "../../controller/ChatController";

function PmModal({ open, close, to }) {
    const[message, setMessage] = useState("");

    const setNewMessage = (e) => {
        const newMessage = e.target.value;
        setMessage(newMessage);
    };

    const sendMessage = () => {
        if(to !== null && message !== "") {
            sendPrivate(to.id, message);
        }
    };

    return(
        <Modal show={open} onHide={close} size="sm" aria-labelledby="pm-modal" >
            <Modal.Header>
                PM -> {to !== null ? to.name : ""}
            </Modal.Header>
            <Modal.Body>
                <input id="pm-message"
                       className="border rounded form-control"
                       type="text"
                       name="text"
                       placeholder="Type a message..." onChange={setNewMessage}/>
               <button onClick={sendMessage}>Send</button>
            </Modal.Body>{console.log(message)}
        </Modal>
    );
}

export default PmModal;