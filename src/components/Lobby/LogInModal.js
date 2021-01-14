import React from 'react'
import ReactDom from 'react-dom'
import Modal from "./Modal";

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

export default function LogInModal({ open, children, onClose }) {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>

        <h2>Login and Get <span>Started</span></h2>
        <span>Just fill in the form below</span>

        <form>

          <p>
            <input type="text" name="name" id="name" placeholder="First Name" required=""
                   autoComplete="off" aria-required="true"/>
          </p>

          <p>
            <input type="password" name="pass" placeholder="Password" required=""
                   autoComplete="off" aria-required="true"/>
          </p>

          <button onClick={onClose}>Close Modal</button>
          {children}


        </form>

      </div>
    </>,
    document.getElementById('portal')
  )
}
