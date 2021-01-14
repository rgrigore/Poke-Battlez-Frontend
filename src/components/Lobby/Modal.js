import React, {useState} from 'react'
import ReactDom from 'react-dom'
import LogInModal from "./LogInModal";

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

export default function Modal({ open, onClose }) {
    const [children, setChildren] = useState(false)
    if (!open) return null
    if(children) return <LogInModal open={children} onClose={onClose}/>

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>

        <h2>Play Now!<span> Sign Up!</span></h2>

        <form>
            <p>
                <input type="text" name="name" id="name" placeholder="First Name" required=""
                   autoComplete="off" aria-required="true"/>
            </p>
            <p>
                <input type="email" name="email" placeholder="E-mail" required=""
                   autoComplete="off" aria-required="true"/>
            </p>
            <p>
            <input type="password" name="pass" placeholder="Password" required=""
                   autoComplete="off" aria-required="true"/>
            </p>
          <button onClick={onClose}>Submit</button>
          {/*{children}*/}
            <button onClick={() => setChildren(true)}>Already a member? Sign In!

            </button>

        </form>
      </div>
    </>,
    document.getElementById('portal')
  )
}
