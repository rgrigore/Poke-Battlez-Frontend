import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {sendChallengeResponse} from "../../controller/ChatController";

function ChallengeModal({open, close, challenger, setChallenger}) {
    const[by, setBy] = useState(null);

    useEffect(() => {
        setBy(challenger);
    }, [challenger]);

    const accept = () => {
        sendChallengeResponse(true, challenger.id)
        setChallenger(null);
        close();
    }

    const decline = () => {
        sendChallengeResponse(false, challenger.id)
        setChallenger(null);
        close();
    }

    return (
        <Modal show={open} onHide={close} size="sm" aria-labelledby="pm-modal" style={{paddingTop: "12rem"}} >
            <Modal.Header style={{backgroundColor: '#828991'}}>
                <h4>{ by !== null ? by.name : "" }</h4>
            </Modal.Header>
            <Modal.Body  style={{backgroundColor: '#9ea8b1'}}>
                <button className="btn btn-dark rounded border w-100 mt-2"
                        title="Accept"
                        style={{ paddingRight: 16 }}
                        onClick={accept}
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