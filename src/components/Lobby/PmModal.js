import React from "react";
import { Modal } from "react-bootstrap";

function PmModal({ open, onClose, to }) {
    return(
        <Modal show={open} onHide={onClose} size="sm" aria-labelledby="pm-modal" >
            <Modal.Body>
                <input id="new-message"
                       className="border rounded form-control"
                       type="text"
                       name="text"
                       placeholder="Type a message..." />
            </Modal.Body>{console.log(to)}
        </Modal>
    );
};

export default PmModal;