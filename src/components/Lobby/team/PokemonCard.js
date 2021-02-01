import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";

import empty from "../../img/pokeball_empty_slot.png";

function PokemonCard({ slot, index }) {

    if(Object.keys(slot).length === 0 && slot.constructor === Object) {
        return(
            <Card bg="secondary" border="warning" style={cardStyle} className="card mb-4">
                <Card.Img variant="top" src={empty} />
                <Card.Body>
                    <Card.Title className="text-center"><h6>Empty Slot {index}</h6></Card.Title>
                </Card.Body>
            </Card>
        );
    } else {
        return(
            <Card bg="secondary" border="success" style={cardStyle} className="mb-4">
                <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${slot.indexId}.png`} />
                <Card.Body>
                    <Card.Title className="text-center">{slot.name}</Card.Title>
                </Card.Body>
            </Card>
        );
    }

}

const cardStyle = {
    width: '8rem',
    marginRight: '15px',
    borderRadius: '15px',
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    fontFamily: 'Impact, Charcoal, sans-serif'
}

PokemonCard.propTypes = {
    slot: PropTypes.object.isRequired
}

export default PokemonCard;