import React, {useEffect, useState, useRef} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import UsersList from "./UsersList";
import ChatBox from "./ChatBox";
import { sendMessage } from "../../controller/ChatController";
// import StompClient from "react-stomp-client";


function Chat() {
    let [messages, setMessages] = useState([]);

    let handleMessage = () => {
        let field = document.getElementById("new-message")
        let message = field.value;
        field.value = "";

        // Message(message);
        sendMessage(message);
    }

    return(
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-0'></div>
                <div className="col-md-12 h-100pr border rounded">
                    <div className='row'>
                        <div className='col-lg-2 col-xs-12 bg-light' style={{ height: 658 }}>
                            <div className='row p-3'><h6>Online Users</h6></div>
                            <div className='row ml-0 mr-0 h-75 bg-white border rounded'
                                 style={{ height: '100%', overflow:'auto' }}>
                                {/* The CustomerList component */}
                                <UsersList />
                            </div>
                        </div>
                        <div className='col-lg-10 col-xs-12 bg-light'  style={{ height: 658 }}>
                            {/*<StompClient endpoint={"ws://localhost:8080/chat-lobby"}*/}
                            {/*             topic={"/chat/lobby"}*/}
                            {/*             onMessage={newMessage => setMessages([...messages, JSON.parse(newMessage.body)])}*/}
                            {/*             debugMode={true}>*/}
                                <div className='row pt-2 bg-white'
                                     style={{ height: 530, overflow:'auto' }}>
                                    {/* The ChatBox component */}
                                    <ChatBox />
                                </div>
                                <div className="row bg-light" style={{ bottom: 0, width: '100%' }}>
                                    <div className="row m-0 p-0 w-100">

                                        <div className="col-9 m-0 p-1">
                                            <input id="new-message"
                                                   className="mw-100 border rounded form-control"
                                                   type="text"
                                                   name="text"
                                                   placeholder="Type a message..."/>
                                        </div>
                                        <div className="col-3 m-0 p-1">
                                            <button className="btn btn-outline-secondary rounded border w-100"
                                                    title="Send"
                                                    style={{ paddingRight: 16 }}
                                                    onClick={handleMessage}>Send</button>
                                        </div>
                                    </div>
                                </div>
                            {/*</StompClient>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;