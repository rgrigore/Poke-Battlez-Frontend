import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types";

function PokemonConfig({ slot, teamIndex, team, setTeam }) {

    if(Object.keys(slot).length === 0 && slot.constructor === Object) {
        return(
            <div>
                <p>Pokemon slot {teamIndex}</p>
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

PokemonConfig.propTypes = {
    slot: PropTypes.object.isRequired,
    team: PropTypes.array.isRequired,
}

export default PokemonConfig;

