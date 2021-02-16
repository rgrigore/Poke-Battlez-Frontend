import React from "react";
import {Badge} from "react-bootstrap";

function SwitchRegion({ team, moves, switching, setSwitching }) {

    return(
        <div className="flex-grow-1 h-30 pt-1 flex-column">
            {switching ? (
                    <div className={"h-30 pt-1 d-flex flex-row"}>
                        <div className={"d-flex mr-0 mb-2 mt-3 justify-content-around h-50"}>
                            {team.map((pokemon, index) => (
                                <div key={index} className="flex-fill">
                                    <img alt={""} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}/>
                                    <Badge variant={"light"}>{ pokemon.hp }</Badge>
                                    {pokemon.types.map((type, index) => (
                                        <Badge key={index} variant={"light"}>{ type }</Badge>
                                    ))}
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
                            // onClick={handleMessage}
                        >z-move</button>
                        <button className="btn btn-primary rounded border"
                                title="mega_evo"
                                style={{ marginRight: 16, minWidth: '100px' }}
                            // onClick={handleMessage}
                        >mega evo</button>
                        <button className="btn btn-warning rounded border"
                                title="switch"
                                style={{ minWidth: '100px' }}
                                onClick={setSwitching}
                        >switch</button>
                    </div>
                    <div className={"d-flex mr-0 mb-2 mt-3 justify-content-around h-50"}>
                        {moves.map((move, index) => (
                                            <button key={index} className="btn btn-dark rounded border h-100"
                                                    title="move1"
                                                    style={{ minWidth: '150px', minHeight: '80px' }}
                                                // onClick={handleMessage}
                                            >{move}</button>
                        ))}
                    </div>
                </div>
            )
            }
        </div>
    );
}

export default SwitchRegion;