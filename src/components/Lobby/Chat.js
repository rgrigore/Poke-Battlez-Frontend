import React, {useEffect, useState} from "react";
import UsersList from "./UsersList";
import ChatBox from "./ChatBox";
import {connect, sendMessage} from "../../controller/ChatController";
import {isAuthenticated} from "../../controller/AccountController";

import "../../css/HiddenScrollbar.css";

function Chat(props) {

	let [first, setFirst] = useState(true);

	let [messages, setMessages] = useState([]);
	let [newMessage, setNewMessage] = useState(null);

	let [users, setUsers] = useState([]);

	useEffect(() => {
		if (newMessage !== null) {
			setMessages([...messages, newMessage]);
		}
		// eslint-disable-next-line
	}, [newMessage]);

	let handleMessage = () => {
		let field = document.getElementById("new-message")
		let message = field.value;
		if (message.length > 0) {
			field.value = "";
			field.focus();

			sendMessage(message);
		}
	}

	let handleEnter = event => {
		if (event.keyCode === 13) {
			handleMessage();
		}
	}

	if (first && isAuthenticated()) {
		connect(setNewMessage, setUsers, props.setTeam);
		setFirst(false);
	}

	return(
		<div className='container-fluid h-100 pt-5' style={{backgroundColor: "slategrey"}}>
			<div className='d-flex align-items-stretch h-100 pt-4'>
				<div className='h-100 d-flex flex-column mr-3' style={{minWidth: "220px"}}>
					<div className='pt-2'><h5 className="pl-2">Online Users</h5></div>
					<div className='flex-fill mt-2 mb-2 border rounded scrollbar-hidden'
					     style={{overflow: "auto", backgroundColor: "rgba(160, 169, 173, 0.17)"}}>
						{/* The CustomerList component */}
						<UsersList users={users} openPm={props.openPm} toPm={props.toPm} />
					</div>
				</div>
				<div className='pt-5 flex-grow-1 h-100 d-flex flex-column'>
					<div className='mr-1 flex-fill border rounded scrollbar-hidden'
					     style={{ overflow:'auto', backgroundColor: "rgba(160, 169, 173, 0.17)" }}>
						<div id={"chatArea"}>
							<ChatBox messages={messages}/>
						</div>
					</div>
					<div className="w-100 my-1 mr-1 pb-2">
						<div className="d-flex w-100">

							<div className="flex-grow-1 p-1">
								<input id="new-message"
								       className="border rounded form-control"
								       type="text"
								       name="text"
								       placeholder="Type a message..."
								       onKeyUp={event => handleEnter(event)} />
							</div>
							<div className="p-1">
								<button className="btn btn-dark rounded border w-100"
								        title="Send"
								        style={{ paddingRight: 16 }}
								        onClick={handleMessage}>Send</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;