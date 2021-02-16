import React, {useState} from "react";
import SwitchRegion from "./SwitchReagion";

function BattleController({ team, currentPokemon }) {

    let [switching, setSwitching] = useState(false);

    return(
        <div className="d-flex container-fluid vh-30 pt-2 pr-0">
            <SwitchRegion team={team} moves={currentPokemon.moves} switching={switching} setSwitching={() => setSwitching(true)} />
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