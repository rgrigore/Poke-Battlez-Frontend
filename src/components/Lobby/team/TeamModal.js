import React, {useState} from "react";
import {Col, ListGroup, Modal, Row, Tab} from "react-bootstrap";
import PokemonCard from "./PokemonCard";
import PokemonConfig from "./PokemonConfig";

import "../../../css/TeamDeck.css";
import PokeBadge from "./PokeBadge";

function TeamModal({open, onClose}) {

    const testPokemon = {
        "id": 1,
        "name": "bulbasaur",
        "Types": ["normal", "green"],
        "Stats": [
            {"name": "HP", "val": 241, "EV": 0, "IV":31},
            {"name": "Atk", "val": 136, "EV": 0, "IV":31},
            {"name": "Def", "val": 136, "EV": 0, "IV":31},
            {"name": "S. Atk", "val": 136, "EV": 0, "IV":31},
            {"name": "S. Def", "val": 136, "EV": 0, "IV":31},
            {"name": "Speed", "val": 136, "EV": 0, "IV":31},
        ],
        "gender": {
            "all": ["male", "female"],
            "selected": ""
        },
        "Level": 50,
        "Nature": {
            "all": ["Hardy", "Lonely", "Brave", "Adamant", "Naughty", "Bold", "Docile",
                "Relaxed", "Impish", "Lax", "Timid", "Hasty", "Serious", "Jolly", "Naive", "Modest",
                "Mild", "Quiet", "Bashful", "Rash", "Calm", "Gentle", "Sassy", "Careful", "Quirky"],
            "selected": ""
        },
        "Item": {
            "all": ["Item 1", "Item 2"],
            "selected": "Item 1"
        },
        "Ability": {
            "all": ["Ability 1", "Ability 2"],
            "selected": ""
        },
        "Moves": {
            "all": ["Move 1", "Move 2"],
            "selected1": {"name": "", "Type": "normal", "Acc": 80, "Cat": "fire", "Power": 80, "Pp": 10},
            "selected2": {"name": "", "Type": "", "Acc": 0, "Cat": "", "Power": 0, "Pp": 0},
            "selected3": {"name": "", "Type": "", "Acc": 0, "Cat": "", "Power": 0, "Pp": 0},
            "selected4": {"name": "", "Type": "", "Acc": 0, "Cat": "", "Power": 0, "Pp": 0}
        }
    }

    const [team, setTeam] = useState([{}, testPokemon, {}, {}, {}, {}]);

    return(
        <Modal
            show={open}
            onHide={onClose}
            size="lg"
            aria-labelledby="teambuild-modal"
        >
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
                                    <img style={{ marginLeft: "8px" }}
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
                                                       teamIndex={index+1}
                                                       setTeam={(newTeam) => setTeam(newTeam)} />
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