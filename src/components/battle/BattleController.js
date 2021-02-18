import React, {useState} from "react";
import SwitchRegion from "./SwitchRegion";
import {sendMove} from "../../controller/BattleController";

function BattleController({ team, currentPokemon, setCurrentPokemon, acted, sendMove, sendSwitch}) {
    const EMPTY_MOVES_ARRAY = ["none", "none", "none", "none"];

    let [switching, setSwitching] = useState(false);

    return(
        <div className="d-flex container-fluid vh-30 pt-2 pr-0">
            <SwitchRegion team={team} moves={currentPokemon !== null && currentPokemon.moves.length > 0 ? currentPokemon.moves : EMPTY_MOVES_ARRAY} switching={switching}
                          setSwitching={() => setSwitching(true)} setCurrentPokemon={setCurrentPokemon}
                          acted={acted} sendMove={sendMove} sendSwitch={sendSwitch}
            />
            <div className="pt-1 h-30 d-flex flex-column">
                <button className="btn btn-danger rounded border w-20 h-75"
                        title="cancel"
                        // style={{ paddingRight: 16 }}
                        onClick={() => setSwitching(false)}
                >X</button>
            </div>
        </div>
    );
}

export default BattleController;