import React, {useEffect, useState} from "react";
import {Col, ListGroup, Modal, Row, Tab} from "react-bootstrap";
import PokemonCard from "./PokemonCard";
import PokemonConfig from "./PokemonConfig";

import "../../../css/TeamDeck.css";
import PokeBadge from "./PokeBadge";

function TeamModal({open, onClose, theTeam}) {

    // const testPokemon = {
    //     "id": 1,
    //     "indexId": 1,
    //     "name": "bulbasaur",
    //     "level": 2,
    //     "ivHp": 31,
    //     "ivAttack": 31,
    //     "ivDefence": 31,
    //     "ivSpAttack": 31,
    //     "ivSpDefence": 31,
    //     "ivSpeed": 28,
    //     "evHp": 7,
    //     "evAttack": 30,
    //     "evDefence": 32,
    //     "evSpAttack": 0,
    //     "evSpDefence": 150,
    //     "evSpeed": 90,
    //     "gender": "Female",
    //     "nature": "Brave",
    //     "heldItem": "master-ball",
    //     "ability": "chlorophyll",
    //     "move1": "razor-wind",
    //     "move2": "cut",
    //     "move3": "tackle",
    //     "move4": "growl"
    // }

    const [team, setTeam] = useState(theTeam===null?[{}, {}, {}, {}, {}, {}]:theTeam);

    // const updateTeam = (receivedTeam) => {
    //     const newTeam = {...team};
    //     theTeam.map(team => {
    //         newTeam[team.position] = team;
    //     })
    //     setTeam(team);
    // };

    useEffect(() => {
        if(theTeam!==null) {
            setTeam(theTeam)
        }
    }, [theTeam])

    return(
        <Modal
            show={open}
            onHide={onClose}
            size="lg"
            aria-labelledby="teambuild-modal"
        >{console.log(theTeam)}
            <Modal.Header closeButton style={{ backgroundColor: "#696969" }}>
                <Modal.Title id="teambuild-modal" >
                    <h6>Teambuilder</h6>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#DCDCDC" }} >
                <Tab.Container id="modal-menu" defaultActiveKey="#team">
                    <Row>
                        <Col sm={2}>
                            <ListGroup>
                                <ListGroup.Item href={"#team"} style={navItemStyle}>
                                    <img alt={"pokemon"} style={{ marginLeft: "8px" }}
                                        src="https://img.icons8.com/color/36/000000/insignia-1-stars--v1.png"/>
                                </ListGroup.Item>
                                {team.map((slot, index) => (
                                    <ListGroup.Item key={index} className={"d-flex p-1 border-2"}
                                                    href={"#poke"+(index+1).toString()}
                                                    style={navItemStyle}>
                                        <PokeBadge slot={slot} key={index} />
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#team">
                                    <div className="container">
                                        <div className="card-deck ml-5">
                                            {team.map((slot, index) => (
                                                <PokemonCard key={index} slot={slot} index={index+1} />
                                            ))}
                                        </div>
                                    </div>
                                </Tab.Pane>
                                {team.map((slot, index) => (
                                    <Tab.Pane key={index} eventKey={"#poke"+(index+1).toString()}>
                                        <PokemonConfig slot={slot}
                                                       team={team}
                                                       key={index}
                                                       teamIndex={index}
                                                       setTeam={(newTeam) => setTeam(newTeam)} onClose={onClose}/>
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
    cursor: "pointer",
    backgroundColor: "#DCDCDC",
    marginLeft: "6px"
};

export default TeamModal;