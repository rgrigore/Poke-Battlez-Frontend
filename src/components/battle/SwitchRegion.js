import React from "react";
import {Badge, ProgressBar} from "react-bootstrap";

function SwitchRegion({ team, moves, switching, setSwitching, setCurrentPokemon, acted, sendMove, sendSwitch }) {

    return(
        <div className="flex-grow-1 h-30 pt-1 flex-column">
            {switching ? (
                    <div className={"h-30 pt-1 d-flex flex-row"}>
                        <div className={"d-flex mr-0 mb-2 mt-3 justify-content-around h-50"}>
                            {team.map((pokemon, index) => (
                                <div key={index} className="flex-fill ml-2 mr-2 justify-content-around"
                                    style={{ marginTop: '-10px' }}>
                                    <div className={"align-self-stretch"}>
                                        <img alt={""} src={pokemon.frontSprite}
                                             style={{margin: '-5px'}} onClick={() => sendSwitch(pokemon.position)}
                                        />
                                        <ProgressBar style={{ width: "auto" }} variant={"info"} animated label={pokemon.currentHp}
                                                 now={pokemon.currentHp} min={0} max={pokemon.hp} />
                                        {pokemon.types.map((type, index) => (
                                            <Badge className={"mr-1"} key={index} variant={"light"}>{ type }</Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            )
            :
            (
                <div>
                    <div className={"d-flex mr-4 justify-content-end"}>
                        <button className="btn btn-info rounded border"
                                title="z-move"
                                style={{ marginRight: 16, minWidth: '100px' }}
                                disabled={acted}
                            // onClick={handleMessage}
                        >z-move</button>
                        <button className="btn btn-primary rounded border"
                                title="mega_evo"
                                style={{ marginRight: 16, minWidth: '100px' }}
                                disabled={acted}
                            // onClick={handleMessage}
                        >mega</button>
                        <button className="btn btn-warning rounded border"
                                title="switch"
                                style={{ minWidth: '100px' }}
                                onClick={setSwitching}
                                disabled={acted}
                        >switch</button>
                    </div>
                    <div className={"d-flex mr-0 mb-2 mt-3 justify-content-around h-50"}>
                        {moves.map((move, index) => (
                            <button key={index} className="btn btn-dark rounded border h-100"
                                    title="move1"
                                    style={{ minWidth: '150px', minHeight: '80px' }}
                                    disabled={acted}
                                    onClick={() => sendMove(move)}
                            >{move}</button>// TODO Replace the index for the call with an actual position
                        ))}
                    </div>
                </div>
            )
            }
        </div>
    );
}

export default SwitchRegion;