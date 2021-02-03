import React, {useEffect} from "react";
import {Typeahead} from "react-bootstrap-typeahead";
import {Badge} from "react-bootstrap";
import axios from "axios";

function MoveConfig({ moves, move, index, refs, teamIndex }) {

    const updateStats = (e) => {
        e.preventDefault();
        const moveName = e.target.value;
        fetch(moveName);
    }

    const fetch = (moveName) => {
        if(moveName !== "" && moveName !== "move..." && moveName !== "none") {
            axios.get(`https://pokeapi.co/api/v2/move/${moveName}`)
                .then(res => {
                    const newStats = {...move.stats};
                    newStats.name = res.data.name;
                    newStats.type = res.data.type.name;
                    newStats.accuracy = res.data.accuracy === null ? "" : res.data.accuracy;
                    newStats.category = res.data.damage_class.name;
                    newStats.power = res.data.power === null ? "" : res.data.power;
                    newStats.pp = res.data.pp === null ? "" : res.data.pp;

                    move.set(newStats);
                });
        }
    }

    useEffect(() => {
        fetch(move.stats.name);
        // eslint-disable-next-line
    }, []);

    return(
        <div className={"p-2"} style={moveInfoStyle}>
            <Typeahead id={"move"+(index+1)} size={"sm"} className={"p-0 mr-1"} style={{minWidth:"130px"}}
                       labelKey={"name"} options={moves}  placeholder={move.name===""?"move...":move.name}
                       inputProps={{"data-save": "move"+(index+1)}} onBlur={updateStats} ref={refs[index+17]}
            />
            <span className={"type"+teamIndex} style={{fontSize:"small", padding: "-3px"}}>
                Type{" "}<Badge pill variant={"light"}>{ move.stats.name !== "" ? move.stats.type : "" }</Badge>
            </span><br/>
            <span className={"acc"+teamIndex} style={{fontSize:"small"}}>
                Acc{ move.stats.name !== "" ? " " + move.stats.accuracy : "" }
            </span><br/>
            <span className={"cat"+teamIndex} style={{fontSize:"small"}}>
                Cat{" "}<Badge pill variant={"light"}>{ move.stats.name !== "" ? move.stats.category : "" }</Badge>
            </span><br/>
            <span className={"power"+teamIndex} style={{fontSize:"small"}}>
                Power{move.stats.name !== "" ? " " + move.stats.power : "" }
            </span><br />
            <span className={"pp"+teamIndex} style={{fontSize:"small"}}>
                Pp{ move.stats.name !== "" ? " " + move.stats.pp : "" }
            </span>
        </div>
    );
}

const moveInfoStyle = {
    borderStyle: "groove"
}

export default MoveConfig;