import React, {useState} from 'react'
import ReactDom from 'react-dom'
import LoginModal from "./LoginModal";
import { register } from "../../../controller/AccountController";

const MODAL_STYLES = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	backgroundColor: '#FFF',
	padding: '50px',
	zIndex: 1000
}

const OVERLAY_STYLES = {
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(0, 0, 0, .7)',
	zIndex: 1000
}

export default function RegisterModal({ open, onClose }) {
	const [children, setChildren] = useState(false)
	if (!open) return null
	if(children) return <LoginModal open={children} onClose={onClose} />

	let registerEvent = () => {
		register({
			email: document.getElementById("register_email").value,
			username: document.getElementById("register_username").value,
			password: document.getElementById("register_password").value
		}, state => {
			if (state) {
				onClose();
			}
		});
	}

	return ReactDom.createPortal(
		<>
			<div style={OVERLAY_STYLES} />
			<div style={MODAL_STYLES}>

				<h2>Play Now!<span> Register!</span></h2>
				<label htmlFor={"register_username"} className={"mb-n1"}>Username</label> <br/>
				<input type="text" name="name" id="register_username" placeholder="Username" required=""
				       autoComplete="off" aria-required="true"/> <br/>
				<label htmlFor={"register_email"} className={"mt-1 mb-n1"}>Email</label> <br/>
				<input type="email" name="email" id="register_email" placeholder="E-mail" required=""
				       autoComplete="off" aria-required="true"/> <br/>
				<label htmlFor={"register_password"} className={"mt-1 mb-n1"}>Password</label> <br/>
				<input type="password" name="pass" id="register_password" placeholder="Password" required=""
				       autoComplete="off" aria-required="true"/> <br/>
				<button onClick={registerEvent} className={"mt-3"}>Register</button>
				<button onClick={() => setChildren(true)}>Already a member? Log In!</button>
			</div>
		</>,
		document.getElementById("modals")
	)
}
