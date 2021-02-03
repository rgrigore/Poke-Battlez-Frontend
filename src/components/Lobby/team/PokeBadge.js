import React from "react";
import PropTypes from "prop-types";
import {Image} from "react-bootstrap";
import pokeLogo from "../../img/pokeball_logo_lobby.png";

function PokeBadge({ slot }) {
    return(
        <Image src={ slot.name != null ? slot.sprite : pokeLogo }
            thumbnail={true} roundedCircle
            style={{ maxWidth: "80%", maxHeight: "auto", marginLeft: "6px", backgroundColor: "gray" }}
        />
    );
}

PokeBadge.propTypes = {
    slot: PropTypes.object.isRequired
}

export default PokeBadge;