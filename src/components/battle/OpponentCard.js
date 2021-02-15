import React from "react";
import {Badge} from "react-bootstrap";

function OpponentCard({ opponent, opponentRank, opponentTeam }) {

    return(
        <div className={"d-flex flex-row"}>
            <div className={"flex-fill mr-2"}>
                <div>Opponent: <Badge variant={"primary"}>{ opponent }</Badge></div>
                <div>Rank: <Badge variant={"primary"}>{ opponentRank }</Badge></div>
            </div>
            <div className={"flex-fill align-self-center"}>
                {opponentTeam.map((pokemon, index) => {
                    return pokemon ?
                    <img key={index} src="https://img.icons8.com/color/30/000000/pokeball--v1.png"/> :
                    <img key={index} src="https://img.icons8.com/material-two-tone/30/000000/pokeball.png"/>
                })}
            </div>
        </div>
    );
}

export default OpponentCard;