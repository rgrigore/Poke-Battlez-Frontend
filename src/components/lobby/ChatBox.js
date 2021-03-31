import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge } from "react-bootstrap";

function ChatBox(props) {

    let [messagesEnd, setMessagesEnd] = useState(null);

    useEffect(() => {
        if (messagesEnd != null) {
            messagesEnd.scrollIntoView();
        }
        // eslint-disable-next-line
    }, [props.messages]);

    return(
        <>
            {props.messages.map((message, index) =>
                message.name != null ?
                    <div key={index + 1} className="message ml-2 mt-1 mb-2">
                        <Badge variant={message.name === "Turn" ? "warning" : "success"} className={"font-weight-bold"}>{message.body === "0" ? "START FIGHT!! Chose your first move!" : message.name + " :"}</Badge>
                        <Badge variant={message.name === "Turn" ? "warning" : "success"} className={"ml-2"}>{message.body === "0" ? "" : message.body}</Badge>
                    </div>
                :
                    <div key={index + 1} className="message ml-2 mt-0">
                        <h5><Badge pill variant={message.body === "" ? "light" : "info"} className={"font-weight-bold"}>{message.body === "" ? ">>>>>>>>>>>>>>>" : message.body}</Badge></h5>
                    </div>
            )}
            <div style={{ float:"left", clear: "both" }}
                 ref={(el) => { setMessagesEnd(el) }} />
        </>
    );
}

ChatBox.propTypes = {
    messages: PropTypes.array.isRequired
}

export default ChatBox;