import React from "react";
import PropTypes from "prop-types";
import {Image} from "react-bootstrap";
import pokeLogo from "../../img/pokeball_logo_lobby.png";
import axios from "axios";

function PokeBadge({ slot }) {
    if(Object.keys(slot).length === 0 && slot.constructor === Object) {
        return(
            <Image thumbnail={true} src={pokeLogo}
                   roundedCircle
                   style={{ maxWidth: "80%", maxHeight: "auto", marginLeft: "6px" }} />
            );
    } else {
        return(
            <Image
                thumbnail={true} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${slot.indexId}.png`}
                roundedCircle
                style={{ maxWidth: "80%", maxHeight: "auto", marginLeft: "6px", backgroundColor: "gray" }}
            />
        );
    }
}

PokeBadge.propTypes = {
    slot: PropTypes.object.isRequired
}

export default PokeBadge;