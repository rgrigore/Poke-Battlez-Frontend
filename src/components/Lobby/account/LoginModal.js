import React from 'react'
import ReactDom from 'react-dom'
import { login } from "../../../controller/AccountController";

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

export default function LoginModal({ open, onClose }) {
	if (!open) return null

	let loginEvent = () => {
		login({
			email: document.getElementById("login_email").value,
			password: document.getElementById("login_password").value
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
				<h2>Login and Get <span>Started</span></h2>
				<label htmlFor={"login_email"} className={"mb-n1"}>Email</label> <br/>
				<input type="text" name="name" id="login_email" placeholder="Email" required=""
				       autoComplete="off" aria-required="true"/> <br/>
				<label htmlFor={"login_password"} className={"mt-1 mb-n1"}>Password</label> <br/>
				<input type="password" name="pass" id="login_password" placeholder="Password" required=""
				       autoComplete="off" aria-required="true"/> <br/>
				<button onClick={loginEvent} className={"mt-3"}>Login</button>
			</div>
		</>,
		document.getElementById("modals")
	)
}
