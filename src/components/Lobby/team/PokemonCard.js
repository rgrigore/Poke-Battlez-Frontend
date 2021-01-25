import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

function PokemonCard({ slot, key }) {

    if(Object.keys(slot).length === 0 && slot.constructor === Object) {
        return(
            <div>
                <p>Empty slot</p>
            </div>
        );
    } else {
        return(
            <div>
                <p>Pokemon {slot.name}</p>
            </div>
        );
    }

}

PokemonCard.propTypes = {
    slot: PropTypes.object.isRequired
}

export default PokemonCard;