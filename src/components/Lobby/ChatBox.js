import React, { useState } from "react";
import { connect } from "../../controller/ChatController";
import 'bootstrap/dist/css/bootstrap.min.css';

function ChatBox() {

    let [first, setFirst] = useState(true);
    let [messages, setMessages] = useState([]);

    let updateMessages = newMessage => {
        setMessages([...messages, newMessage])
    }

    if (first) {
        connect(updateMessages);
        setFirst(false);
    }

    return(
        <div className='col-xl-12'>
            {messages.map((message, index) => (
                    <div key={index+1} className="message">
                        <div className={`p-3 m-1`}>
                            {message}
                        </div>
                    </div>
            ))}
        </div>
    );
}

export default ChatBox;