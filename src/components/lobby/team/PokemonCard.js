import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";

import empty from "../../img/pokeball_empty_slot.png";

function PokemonCard({ pokemon, index }) {

    // const [sprite, setSprite] = useState(pokemon.name !== null ? pokemon.sprite : empty);
    //
    // useEffect(() => {
    //     if (pokemon.name !== null) {
    //         setSprite(pokemon.sprite);
    //     }
    //     // eslint-disable-next-line
    // }, [pokemon.sprite])

    return(
        <Card bg="secondary" border="success" style={cardStyle} className="mb-4">
            <Card.Img variant="top" src={ pokemon.name !== null ? pokemon.sprite : empty } />
            <Card.Body>
                <Card.Title className="text-center">{ pokemon.name != null ? pokemon.name : <h6>Empty Slot {index}</h6> }</Card.Title>
            </Card.Body>
        </Card>
    );
}

const cardStyle = {
    width: '8rem',
    marginRight: '15px',
    borderRadius: '15px',
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    fontFamily: 'Impact, Charcoal, sans-serif'
}

PokemonCard.propTypes = {
    pokemon: PropTypes.object.isRequired
}

export default PokemonCard;