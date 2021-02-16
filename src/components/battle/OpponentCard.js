import React from "react";
import {Badge} from "react-bootstrap";

function OpponentCard({ opponent, opponentRank, opponentTeam }) {

    return(
        <div className={"d-flex flex-row"} style={{
            backgroundColor: "rgba(160, 169, 173, 0.17)",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        }}>
            <div className={"flex-fill mr-2 pl-2"}>
                <div><Badge variant={"danger"}>{ opponent }</Badge></div>
                <div className={"pb-1"}>
                    <img src="https://img.icons8.com/officel/16/000000/command-sergeant-major-csm.png"/>{" "}
                    <Badge variant={"warning"}>{ opponentRank }</Badge>
                </div>
            </div>
            <div className={"flex-fill align-self-center pr-2"}>
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