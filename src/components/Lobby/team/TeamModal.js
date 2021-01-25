import React, { useState } from "react";
import { Modal, Tab, Row, Col, ListGroup } from "react-bootstrap";
import PokemonCard from "./PokemonCard";
import PokemonConfig from "./PokemonConfig";

function TeamModal({open, onClose}) {

    const [team, setTeam] = useState([{"name": 1}, {"name": 2}, {}, {}, {}, {"name": 6}]);

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
                                {team.map((slot, index) => (
                                    <ListGroup.Item href={"#poke"+(index+1).toString()} style={navItemStyle}>
                                        #Poke {index+1}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#team">
                                    {team.map((slot, index) => (
                                        <PokemonCard key={index} slot={slot} />
                                    ))}
                                </Tab.Pane>
                                {team.map((slot, index) => (
                                    <Tab.Pane eventKey={"#poke"+(index+1).toString()}>
                                        <PokemonConfig slot={slot} team={team} key={index} setTeam={(newTeam) => setTeam(newTeam)} />
                                    </Tab.Pane>
                                ))}
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