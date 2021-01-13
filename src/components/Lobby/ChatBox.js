import React, {useEffect, useState} from "react";
import { connect } from "../../controller/ChatController";
import 'bootstrap/dist/css/bootstrap.min.css';

function ChatBox() {

    let [first, setFirst] = useState(true);
    let [messages, setMessages] = useState([]);
    let [newMessage, setNewMessage] = useState(null);

    let [messagesEnd, setMessagesEnd] = useState(null);

    useEffect(() => {
        if (newMessage !== null) {
            setMessages([...messages, newMessage]);
        }
        // eslint-disable-next-line
    }, [newMessage]);

    useEffect(() => {
        if (messagesEnd !== null) {
            messagesEnd.scrollIntoView();
        }
        // eslint-disable-next-line
    }, [messages])

    if (first) {
        connect(setNewMessage);
        setFirst(false);
    }

    return(
        <div id={"chatArea"} className='col-xl-12' style={{resize: "none"}}>
            {messages.map((message, index) => (
              <div key={index+1} className="message ml-2 mt-1">
                  <span className={"font-weight-bold"}>{message.name} :</span>
                  <span className={"ml-2"}>{message.body}</span>
              </div>
            ))}
            <div style={{ float:"left", clear: "both" }}
                 ref={(el) => { setMessagesEnd(el) }} />
        </div>
    );
}

export default ChatBox;