import React, { useState } from "react";
import { Modal, Tab, Row, Col, ListGroup } from "react-bootstrap";

function TeamModal({open, onClose}) {

    return(
        <Modal
            show={open}
            onHide={onClose}
            size="lg"
            aria-labelledby="teambuild-modal"
        >
            <Modal.Header closeButton style={{ backgroundColor: "#696969" }}>
                <Modal.Title id="teambuild-modal">
                    <h5>Teambuilder</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tab.Container id="modal-menu" defaultActiveKey="#team">
                    <Row>
                        <Col sm={2}>
                            <ListGroup>
                                <ListGroup.Item href={"#team"} style={navItemStyle}>
                                    <h6>Team</h6>
                                </ListGroup.Item>
                                <ListGroup.Item href={"#poke1"} style={navItemStyle}>
                                    #Poke 1
                                </ListGroup.Item>
                                <ListGroup.Item href={"#poke2"} style={navItemStyle}>
                                    #Poke 2
                                </ListGroup.Item>
                                <ListGroup.Item href={"#poke3"} style={navItemStyle}>
                                    #Poke 3
                                </ListGroup.Item>
                                <ListGroup.Item href={"#poke4"} style={navItemStyle}>
                                    #Poke 4
                                </ListGroup.Item>
                                <ListGroup.Item href={"#poke5"} style={navItemStyle}>
                                    #Poke 5
                                </ListGroup.Item>
                                <ListGroup.Item href={"#poke6"} style={navItemStyle}>
                                    #Poke 6
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#team">
                                    <p>Component</p>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#poke1">
                                    <p>Poke1</p>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Modal.Body>
        </Modal>
    );
}

const navItemStyle = {
    cursor: "pointer"
};

export default TeamModal;