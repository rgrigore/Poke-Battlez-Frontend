import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { connect } from "../../controller/ChatController";
import 'bootstrap/dist/css/bootstrap.min.css';

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
            {props.messages.map((message, index) => (
              <div key={index+1} className="message ml-2 mt-1">
                  <span className={"font-weight-bold"}>{message.name} :</span>
                  <span className={"ml-2"}>{message.body}</span>
              </div>
            ))}
            <div style={{ float:"left", clear: "both" }}
                 ref={(el) => { setMessagesEnd(el) }} />
        </>
    );
}

ChatBox.propTypes = {
    messages: PropTypes.array.isRequired
}

export default ChatBox;