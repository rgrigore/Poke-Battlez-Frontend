import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types";
import { Image, Badge, ProgressBar, FormControl, Button } from "react-bootstrap";

function PokemonConfig({ slot, teamIndex, team, setTeam }) {
    // empty Pokemon Object
    const Pokemon = {
        "id": 0,
        "name": "Pokemon...",
        "Types": ["normal"],
        "Stats": [
            {"name": "HP", "val": 241, "IV": 0, "EV":31},
            {"name": "Atk", "val": 136, "IV": 0, "EV":31},
            {"name": "Def", "val": 136, "IV": 0, "EV":31},
            {"name": "S. Atk", "val": 136, "IV": 0, "EV":31},
            {"name": "S. Def", "val": 136, "IV": 0, "EV":31},
            {"name": "Speed", "val": 136, "IV": 0, "EV":31},
        ],
        "gender": {
            "all": ["Gender..."],
            "selected": ""
        },
        "Level": 0,
        "Nature": {
            "all": ["Hardy", "Lonely", "Brave", "Adamant", "Naughty", "Bold", "Docile",
                    "Relaxed", "Impish", "Lax", "Timid", "Hasty", "Serious", "Jolly", "Naive", "Modest",
                    "Mild", "Quiet", "Bashful", "Rash", "Calm", "Gentle", "Sassy", "Careful", "Quirky"],
            "selected": ""
        },
        "Item": {
            "all": ["Item..."],
            "selected": ""
        },
        "Ability": {
            "all": ["(No Ability)"],
            "selected": ""
        },
        "Moves": {
            "all": ["Move..."],
            "selected1": {"name": "", "Type": "", "Acc": 0, "Cat": "", "Power": 0, "Pp": 0},
            "selected2": {"name": "", "Type": "", "Acc": 0, "Cat": "", "Power": 0, "Pp": 0},
            "selected3": {"name": "", "Type": "", "Acc": 0, "Cat": "", "Power": 0, "Pp": 0},
            "selected4": {"name": "", "Type": "", "Acc": 0, "Cat": "", "Power": 0, "Pp": 0}
        }
    }

    const [pokemon, setPokemon] = useState((Object.keys(slot).length === 0 && slot.constructor === Object) ? Pokemon : slot);

    return(
        <div className={"d-flex flex-column"}>
            <div className="p-0">
                <div className="d-flex flex-row">
                    <div className="p-1">
                        <div style={{ textAlign: "center" }}>
                            <Image
                                thumbnail={true}
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                                style={{ width: "90%" ,maxHeight: "auto", backgroundColor: "gray" }}
                            />
                        </div>
                        <div style={{ textAlign: "center" }}>
                            {pokemon.Types.map((type, i) => (
                                <Badge pill variant={"light"} className={"mr-1"} key={i}>{type}</Badge>
                            ))}
                        </div>
                        <div style={{ marginTop: "15px" }}>
                            <input className={"form-control"} placeholder={pokemon.name}/>
                        </div>
                    </div>
                    <div className={"pl-1 pr-1 pt-1"}>
                        {pokemon.Stats.map((stat, i) => (
                            <div className={"d-flex justify-content-center flex-row pb-2"} key={i}>
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
                                        <FormControl size={"sm"} type={"number"} min={0} max={252} placeholder={"IV"} defaultValue={stat.IV}/>
                                        <FormControl size={"sm"} type={"number"} min={0} max={31} placeholder={"EV"} defaultValue={stat.EV} />
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
                        <FormControl as="select" size={"sm"} className={"p-1"} defaultValue={pokemon.gender.selected}>
                            {pokemon.gender.all.map((gender,i) =>(
                                <option key={i}>{gender}</option>
                            ))}
                        </FormControl>
                        <h6 className={"p-2"}>Level</h6>
                        <FormControl size={"sm"} defaultValue={pokemon.Level} type={"number"} min={0} max={100} placeholder={"Level"} className={"mr-2"} style={{maxWidth:"70px"}} />
                        <FormControl as="select" size={"sm"} className={"p-1 mr-2"} defaultValue={pokemon.Nature.selected}>
                            {pokemon.Nature.all.map((nature, i) =>(
                                <option key={i}>{nature}</option>
                            ))}
                        </FormControl>
                        <FormControl as="select" size={"sm"} className={"p-1 mr-2"} style={{minWidth:"130px"}} defaultValue={pokemon.Item.selected}>
                            {pokemon.Item.all.map((item, i) => (
                                <option key={i}>{item}</option>
                            ))}
                        </FormControl>
                        <FormControl as="select" size={"sm"} className={"p-1"} style={{minWidth:"130px"}} defaultValue={pokemon.Ability.selected}>
                            {pokemon.Ability.all.map((ability, i) => (
                                <option key={i}>{ability}</option>
                            ))}
                        </FormControl>
                    </div>
                    <div className="p-0 d-flex justify-content-center">
                        <div className={"p-2"} style={moveInfoStyle}>
                            <FormControl as="select" size={"sm"} className={"p-1 mr-2"} style={{minWidth:"130px"}}
                                         defaultValue={pokemon.Moves.selected1.name}>
                                {pokemon.Moves.all.map((move, i) => (
                                    <option key={i}>{move}</option>
                                ))}
                            </FormControl>
                            <span style={{fontSize:"small", padding: "-3px"}}>Type{" "}
                                <Badge pill variant={"light"}>{pokemon.Moves.selected1.Type}</Badge>
                            </span><br />
                            <span style={{fontSize:"small"}}>Acc{" "+pokemon.Moves.selected1.Acc}%</span><br />
                            <span style={{fontSize:"small"}}>Cat{" "}
                                <Badge pill variant={"light"}>{pokemon.Moves.selected1.Cat}</Badge>
                            </span><br />
                            <span style={{fontSize:"small"}}>Power{" "+pokemon.Moves.selected1.Power}</span><br />
                            <span style={{fontSize:"small"}}>Pp{" "+pokemon.Moves.selected1.Pp}</span>
                        </div>
                        <div className={"p-2"} style={moveInfoStyle}>
                            <FormControl as="select" size={"sm"} className={"p-1 mr-2"} style={{minWidth:"130px"}} defaultValue={pokemon.Moves.selected2.name}>
                                {pokemon.Moves.all.map((move, i) => (
                                    <option key={i}>{move}</option>
                                ))}
                            </FormControl>
                            <span style={{fontSize:"small", padding: "-3px"}}>Type{" "}
                                <Badge pill variant={"light"}>{pokemon.Moves.selected2.Type}</Badge>
                            </span><br />
                            <span style={{fontSize:"small"}}>Acc{" "+pokemon.Moves.selected2.Acc}%</span><br />
                            <span style={{fontSize:"small"}}>Cat{" "}
                                <Badge pill variant={"light"}>{pokemon.Moves.selected2.Cat}</Badge>
                            </span><br />
                            <span style={{fontSize:"small"}}>Power{" "+pokemon.Moves.selected2.Power}</span><br />
                            <span style={{fontSize:"small"}}>Pp{" "+pokemon.Moves.selected2.Pp}</span>
                        </div>
                        <div className={"p-2"} style={moveInfoStyle}>
                            <FormControl as="select" size={"sm"} className={"p-1 mr-2"} style={{minWidth:"130px"}} defaultValue={pokemon.Moves.selected3.name}>
                                {pokemon.Moves.all.map((move, i) => (
                                    <option key={i}>{move}</option>
                                ))}
                            </FormControl>
                            <span style={{fontSize:"small", padding: "-3px"}}>Type{" "}
                                <Badge pill variant={"light"}>{pokemon.Moves.selected3.Type}</Badge>
                            </span><br />
                            <span style={{fontSize:"small"}}>Acc{" "+pokemon.Moves.selected3.Acc}%</span><br />
                            <span style={{fontSize:"small"}}>Cat{" "}
                                <Badge pill variant={"light"}>{pokemon.Moves.selected3.Cat}</Badge>
                            </span><br />
                            <span style={{fontSize:"small"}}>Power{" "+pokemon.Moves.selected3.Power}</span><br />
                            <span style={{fontSize:"small"}}>Pp{" "+pokemon.Moves.selected3.Pp}</span>
                        </div>
                        <div className={"p-2"} style={moveInfoStyle}>
                            <FormControl as="select" size={"sm"} className={"p-1 mr-2"} style={{minWidth:"130px"}} defaultValue={pokemon.Moves.selected4.name}>
                                {pokemon.Moves.all.map((move, i) => (
                                    <option key={i}>{move}</option>
                                ))}
                            </FormControl>
                            <span style={{fontSize:"small", padding: "-3px"}}>Type{" "}
                                <Badge pill variant={"light"}>{pokemon.Moves.selected4.Type}</Badge>
                            </span><br />
                            <span style={{fontSize:"small"}}>Acc{" "+pokemon.Moves.selected4.Acc}%</span><br />
                            <span style={{fontSize:"small"}}>Cat{" "}
                                <Badge pill variant={"light"}>{pokemon.Moves.selected4.Cat}</Badge>
                            </span><br />
                            <span style={{fontSize:"small"}}>Power{" "+pokemon.Moves.selected4.Power}</span><br />
                            <span style={{fontSize:"small"}}>Pp{" "+pokemon.Moves.selected4.Pp}</span>
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

const moveInfoStyle = {
    borderStyle: "groove"
}

PokemonConfig.propTypes = {
    slot: PropTypes.object.isRequired,
    team: PropTypes.array.isRequired,
}

export default PokemonConfig;

