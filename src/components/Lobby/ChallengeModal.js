import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
// import {sendChallenge} from "../../controller/ChatController"; //TODO import acceptChallenge method after implementation

function ChallengeModal({open, close, challenger, setChallenger}) {
    const[by, setBy] = useState(null);

    useEffect(() => {
        setBy(challenger);
    }, [challenger]);

    const decline = () => {
        setChallenger(null);
        close();
    }

    return (
        <Modal show={open} onHide={close} size="sm" aria-labelledby="pm-modal" style={{paddingTop: "12rem"}} >
            <Modal.Header style={{backgroundColor: '#828991'}}>
                <h4>{ by !== null ? by.name : "" }</h4>
                {console.log(by !== null ? by.name : "")}
                {console.log(by !== null ? by.id : "")}
            </Modal.Header>
            <Modal.Body  style={{backgroundColor: '#9ea8b1'}}>
                <button className="btn btn-dark rounded border w-100 mt-2"
                        title="Accept"
                        style={{ paddingRight: 16 }}
                        // onClick={sendMessage} // TODO switch with acceptChallenge method after implementation
                >Accept
                </button>
                <button className="btn btn-danger rounded border w-100 mt-2"
                        title="Decline"
                        style={{ paddingRight: 16 }}
                        onClick={decline}
                >Decline
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default ChallengeModal;