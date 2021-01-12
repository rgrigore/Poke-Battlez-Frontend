import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function ChatBox() {
    const messages = ["Hello user"];

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