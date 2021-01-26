import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types";
import { Image, Badge, ProgressBar, FormControl, Button } from "react-bootstrap";

function PokemonConfig({ slot, teamIndex, team, setTeam }) {
    // empty Pokemon Object
    const Pokemon = {
        "name": "",
        "Types": [],
        "Stats": [
            {"name": "HP", "val": 241, "IV": 0, "EV":31},
            {"name": "Atk", "val": 136, "IV": 0, "EV":31},
            {"name": "Def", "val": 136, "IV": 0, "EV":31},
            {"name": "S. Atk", "val": 136, "IV": 0, "EV":31},
            {"name": "S. Def", "val": 136, "IV": 0, "EV":31},
            {"name": "Speed", "val": 136, "IV": 0, "EV":31},
        ],
        "gender": "",
        "Level": 0,
        "Nature": "",
        "Item": "",
        "Ability": "",
        "Moves": []
    }

    // dummy Stats
    const dummyStats = [{"name": "HP", "val": 241},
                        {"name": "Atk", "val": 136},
                        {"name": "Def", "val": 136},
                        {"name": "S. Atk", "val": 136},
                        {"name": "S. Def", "val": 136},
                        {"name": "Speed", "val": 136}];

    if(Object.keys(slot).length === 0 && slot.constructor === Object) {
        return(
            <div>
                <p>Pokemon slot {teamIndex}</p>
            </div>
        );
    } else {
        return(
            <div className={"d-flex flex-column"}>
                <div className="p-0">
                    <div className="d-flex flex-row">
                        <div className="p-1">
                            <div style={{ textAlign: "center" }}>
                                <Image
                                    thumbnail={true}
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${slot.name}.png`}
                                    style={{ width: "90%" ,maxHeight: "auto", backgroundColor: "gray" }}
                                />
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <Badge pill variant={"light"}>Typeeee</Badge>
                            </div>
                            <div style={{ marginTop: "15px" }}>
                                <input className={"form-control"} placeholder={"Pokemon..."}/>
                            </div>
                        </div>
                        <div className={"pl-1 pr-1 pt-1"}>
                            {dummyStats.map((stat, i) => (
                                <div className={"d-flex justify-content-center flex-row pb-2"}>
                                    <div className={"pl-2 pt-2"}><h6>{stat.name}</h6></div>
                                    <div className={"pl-3 pt-2 ml-auto"}><h6>{stat.val}</h6></div>
                                    <div className={"align-self-center pl-3"}>
                                        <ProgressBar style={{ width: "140px" }}
                                                     variant={"info"}
                                                     animated now={stat.val}
                                                     label={stat.val}
                                                     min={0}
                                                     max={180} />
                                    </div>
                                    <div className={"align-self-center pr-1"} typeof={"number"} style={{paddingLeft: "20px"}}>
                                        <div className={"d-flex flex-row"}>
                                            <FormControl size={"sm"} type={"number"} min={0} max={252} placeholder={"IV"} />
                                            <FormControl size={"sm"} type={"number"} min={0} max={31} placeholder={"EV"} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-2">
                    <div className="d-flex flex-column">
                        <div className="p-0 d-flex justify-content-center">
                            <FormControl as="select" size={"sm"} className={"p-1"}>
                                <option>Male</option>
                                <option>Female</option>
                            </FormControl>
                            <h6 className={"p-2"}>Level</h6>
                            <FormControl size={"sm"} type={"number"} min={0} max={100} placeholder={"Level"} className={"mr-2"} style={{maxWidth:"70px"}} />
                            <FormControl as="select" size={"sm"} className={"p-1 mr-2"}>
                                <option>Nature 1</option>
                                <option>Nature 2</option>
                            </FormControl>
                            <FormControl as="select" size={"sm"} className={"p-1 mr-2"} style={{minWidth:"130px"}}>
                                <option>Item 1</option>
                                <option>Item 2</option>
                            </FormControl>
                            <FormControl as="select" size={"sm"} className={"p-1"} style={{minWidth:"130px"}}>
                                <option>Ability 1</option>
                                <option>Ability 2</option>
                            </FormControl>
                        </div>
                        <div className="p-0 d-flex justify-content-center">
                            <div className={"p-2"} style={{borderStyle: "groove"}}>
                                <FormControl as="select" size={"sm"} className={"p-1 mr-2"} style={{minWidth:"130px"}}>
                                    <option>Move 1</option>
                                    <option>Move 2</option>
                                </FormControl>
                                <span style={{fontSize:"small", padding: "-3px"}}>Type</span><br />
                                <span style={{fontSize:"small"}}>Acc</span><br />
                                <span style={{fontSize:"small"}}>Cat</span><br />
                                <span style={{fontSize:"small"}}>Power</span><br />
                                <span style={{fontSize:"small"}}>Pp</span>
                            </div>
                            <div className={"p-2"} style={{borderStyle: "groove"}}>
                                <FormControl as="select" size={"sm"} className={"p-1 mr-2"} style={{minWidth:"130px"}}>
                                    <option>Move 1</option>
                                    <option>Move 2</option>
                                </FormControl>
                                <span style={{fontSize:"small", padding: "-3px"}}>Type</span><br />
                                <span style={{fontSize:"small"}}>Acc</span><br />
                                <span style={{fontSize:"small"}}>Cat</span><br />
                                <span style={{fontSize:"small"}}>Power</span><br />
                                <span style={{fontSize:"small"}}>Pp</span>
                            </div>
                            <div className={"p-2"} style={{borderStyle: "groove"}}>
                                <FormControl as="select" size={"sm"} className={"p-1 mr-2"} style={{minWidth:"130px"}}>
                                    <option>Move 1</option>
                                    <option>Move 2</option>
                                </FormControl>
                                <span style={{fontSize:"small", padding: "-3px"}}>Type</span><br />
                                <span style={{fontSize:"small"}}>Acc</span><br />
                                <span style={{fontSize:"small"}}>Cat</span><br />
                                <span style={{fontSize:"small"}}>Power</span><br />
                                <span style={{fontSize:"small"}}>Pp</span>
                            </div>
                            <div className={"p-2"} style={{borderStyle: "groove"}}>
                                <FormControl as="select" size={"sm"} className={"p-1 mr-2"} style={{minWidth:"130px"}}>
                                    <option>Move 1</option>
                                    <option>Move 2</option>
                                </FormControl>
                                <span style={{fontSize:"small", padding: "-3px"}}>Type</span><br />
                                <span style={{fontSize:"small"}}>Acc</span><br />
                                <span style={{fontSize:"small"}}>Cat</span><br />
                                <span style={{fontSize:"small"}}>Power</span><br />
                                <span style={{fontSize:"small"}}>Pp</span>
                            </div>
                        </div>
                        <div className="p-1 d-flex justify-content-end">
                            <Button variant="secondary" size="sm">
                                Cancel
                            </Button>
                            <Button variant="secondary" size="sm" className={"pl-2 ml-2"}>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PokemonConfig.propTypes = {
    slot: PropTypes.object.isRequired,
    team: PropTypes.array.isRequired,
}

export default PokemonConfig;

