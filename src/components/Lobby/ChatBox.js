import React, { useState } from "react";
import { connect } from "../../controller/ChatController";
import 'bootstrap/dist/css/bootstrap.min.css';

function ChatBox(props) {

    let [first, setFirst] = useState(true);
    let [messages, setMessages] = useState([]);

    let updateMessages = newMessage => {
        console.log(messages);
        setMessages(messages.concat(newMessage))
    }

    if (first) {
        connect(updateMessages);
        setFirst(false);
    }

    return(
        <ul className='col-xl-12'>
            {messages.map((message, index) => (
                    <li key={index+1} className="message">
                        <span className={`p-3 m-1`}>
                            {message}
                        </span>
                    </li>
            ))}
        </ul>
    );
}

export default ChatBox;