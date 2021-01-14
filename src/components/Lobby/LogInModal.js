import React from 'react'
import ReactDom from 'react-dom'

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

export default function LogInModal({ open, onClose }) {
  if (!open) return null

  let login = () => {
    let username = document.getElementById("login_username").value;
    let password = document.getElementById("login_password").value;
  }

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <h2>Login and Get <span>Started</span></h2>
        <span>Just fill in the form below</span>
          <p>
            <input type="text" name="name" id="login_username" placeholder="Username" required=""
                   autoComplete="off" aria-required="true"/>
          </p>
          <p>
            <input type="password" name="pass" id="login_password" placeholder="Password" required=""
                   autoComplete="off" aria-required="true"/>
          </p>
        <button onClick={login}>Login</button>
      </div>
    </>,
      document.getElementById("modals")
  )
}
