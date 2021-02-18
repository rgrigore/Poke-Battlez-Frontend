import React, {useEffect, useState} from "react";
import {Col, ListGroup, Modal, Row, Tab} from "react-bootstrap";
import PokemonCard from "./PokemonCard";
import PokemonConfig from "./PokemonConfig";

import "../../../css/TeamDeck.css";
import PokeBadge from "./PokeBadge";

function TeamModal({open, onClose, updatedTeam}) {

    // const testPokemon = {
    //     "id": 1,
    //     "teamId": 1,
    //     "indexId": 1,
    //     "position": 1,
    //     "name": "bulbasaur",
    //     "level": 2,
    //     "ivHp": 31,
    //     "ivAttack": 31,
    //     "ivDefense": 31,
    //     "ivSpAttack": 31,
    //     "ivSpDefense": 31,
    //     "ivSpeed": 28,
    //     "evHp": 7,
    //     "evAttack": 30,
    //     "evDefense": 32,
    //     "evSpAttack": 0,
    //     "evSpDefense": 150,
    //     "evSpeed": 90,
    //     "gender": "Female",
    //     "nature": "Brave",
    //     "heldItem": "master-ball",
    //     "ability": "chlorophyll",
    //     "move1": "razor-wind",
    //     "move2": "cut",
    //     "move3": "tackle",
    //     "move4": "growl",
    //
    //     sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    // }

    let emptyPokemon = {
        id: null,
        teamId: null,
        position: null,
        name: null,
        level: 1,
        ivHp: 31,
        ivAttack: 31,
        ivDefense: 31,
        ivSpAttack: 31,
        ivSpDefense: 31,
        ivSpeed: 31,
        evHp: 0,
        evAttack: 0,
        evDefense: 0,
        evSpAttack: 0,
        evSpDefense: 0,
        evSpeed: 0,
        gender: "",
        nature: "",
        heldItem: "",
        ability: "",
        move1: "none",
        move2: "none",
        move3: "none",
        move4: "none",

        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
    }

    const [pokemon1, setPokemon1] = useState(emptyPokemon);
    const [pokemon2, setPokemon2] = useState(emptyPokemon);
    const [pokemon3, setPokemon3] = useState(emptyPokemon);
    const [pokemon4, setPokemon4] = useState(emptyPokemon);
    const [pokemon5, setPokemon5] = useState(emptyPokemon);
    const [pokemon6, setPokemon6] = useState(emptyPokemon);

    const [team, setTeam] = useState([
        { pokemon: pokemon1, set: setPokemon1 },
        { pokemon: pokemon2, set: setPokemon2 },
        { pokemon: pokemon3, set: setPokemon3 },
        { pokemon: pokemon4, set: setPokemon4 },
        { pokemon: pokemon5, set: setPokemon5 },
        { pokemon: pokemon6, set: setPokemon6 }
    ]);

    useEffect(() => {
        const teamTemp = [...team];
        teamTemp[0].pokemon = pokemon1;
        teamTemp[1].pokemon = pokemon2;
        teamTemp[2].pokemon = pokemon3;
        teamTemp[3].pokemon = pokemon4;
        teamTemp[4].pokemon = pokemon5;
        teamTemp[5].pokemon = pokemon6;
        setTeam(teamTemp);

        // eslint-disable-next-line
    }, [pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6])

    let resetTeam = teamId => {
        for (let index in team) {
            let temp = {...emptyPokemon}
            temp.position = index;
            temp.teamId = teamId;

            team[index].set(temp);
        }
    }

    useEffect(() => {
        resetTeam(0)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(updatedTeam !== null) {
            resetTeam(updatedTeam.teamId);
            for (let pokemon of updatedTeam.pokemon) {
                team[pokemon.position].set({...pokemon, sprite: team[pokemon.position].pokemon.sprite});
            }
        }

        // eslint-disable-next-line
    }, [updatedTeam])

    return(
        <Modal show={open} onHide={onClose} size="lg" aria-labelledby="teambuild-modal" >
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
                                {team.map((pokemon, index) => (
                                    <ListGroup.Item key={index} className={"d-flex p-1 border-2"}
                                                    href={"#poke"+(index+1).toString()}
                                                    style={navItemStyle}>
                                        <PokeBadge slot={pokemon.pokemon} key={index} />
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#team">
                                    <div className="container">
                                        <div className="card-deck ml-5">
                                            {team.map((teamMember, index) => (
                                                <PokemonCard key={index} pokemon={teamMember.pokemon} index={index+1} />
                                            ))}
                                        </div>
                                    </div>
                                </Tab.Pane>
                                {team.map((pokemon, index) => (
                                    <Tab.Pane key={index} eventKey={"#poke"+(index+1).toString()}>
                                        <PokemonConfig key={index} teamPokemon={pokemon} onClose={onClose} />
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