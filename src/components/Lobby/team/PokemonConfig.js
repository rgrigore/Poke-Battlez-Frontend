import React, {useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types";
import {Badge, Button, FormControl, Image, ProgressBar} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import axios from "axios";
import MoveConfig from "./MoveConfig";
import {sendPokemon} from "../../../controller/ChatController";

function PokemonConfig({ slot, teamIndex, team, setTeam, onClose, dbTeam }) {
    // empty Pokemon Object
    let Pokemon = {
        "id": null,
        "indexId": 0,
        "teamId": null,
        "position": teamIndex,
        "name": "",
        "level": 1,
        "ivHp": 31,
        "ivAttack": 31,
        "ivDefence": 31,
        "ivSpAttack": 31,
        "ivSpDefence": 31,
        "ivSpeed": 31,
        "evHp": 0,
        "evAttack": 0,
        "evDefence": 0,
        "evSpAttack": 0,
        "evSpDefence": 0,
        "evSpeed": 0,
        "gender": "",
        "nature": "",
        "heldItem": "",
        "ability": "",
        "move1": "",
        "move2": "",
        "move3": "",
        "move4": ""
    }

    const [pokemon, setPokemon] = useState((Object.keys(slot).length === 0 && slot.constructor === Object) ? Pokemon : slot);

    // let PokemonFormDataBase = {
    //     "id": 0,
    //     "name": "",
    //     "level": 0,
    //     "Types": ["normal"],
    //     "stats": [
    //         {"name": "HP", "base": 0, "val": 241, "EV": 0, "IV": 31},
    //         {"name": "Atk", "base": 0, "val": 136, "EV": 0, "IV": 31},
    //         {"name": "Def", "base": 0, "val": 136, "EV": 0, "IV": 31},
    //         {"name": "S. Atk", "base": 0, "val": 136, "EV": 0, "IV": 31},
    //         {"name": "S. Def", "base": 0, "val": 136, "EV": 0, "IV": 31},
    //         {"name": "Speed", "base": 0, "val": 136, "EV": 0, "IV": 31}
    //     ],
    //     "genders": {
    //         "all": ["Gender"],
    //         "selected": ""
    //     },
    //     "natures": {
    //         "all": ["Hardy", "Lonely", "Brave", "Adamant", "Naughty", "Bold", "Docile",
    //             "Relaxed", "Impish", "Lax", "Timid", "Hasty", "Serious", "Jolly", "Naive", "Modest",
    //             "Mild", "Quiet", "Bashful", "Rash", "Calm", "Gentle", "Sassy", "Careful", "Quirky"],
    //         "selected": ""
    //     },
    //     "items": {
    //         "all": ["Items..."],
    //         "selected": ""
    //     },
    //     "abilities": {
    //         "all": ["Ability..."],
    //         "selected": ""
    //     },
    //     "moves": {
    //         "all": ["move..."],
    //         "selected": [
    //             {"name": "", "Type": "", "Acc": 0, "Cat": "", "Power": 0, "Pp": 0},
    //             {"name": "", "Type": "", "Acc": 0, "Cat": "", "Power": 0, "Pp": 0},
    //             {"name": "", "Type": "", "Acc": 0, "Cat": "", "Power": 0, "Pp": 0},
    //             {"name": "", "Type": "", "Acc": 0, "Cat": "", "Power": 0, "Pp": 0}
    //         ]
    //     }
    // }

    let PokemonFormData = {
        "id": 0,
        "name": pokemon.name,
        "level": pokemon.level,
        "Types": ["normal"],
        "stats": [
            {"name": "HP", "base": 0, "val": 241, "EV": pokemon.evHp, "IV": pokemon.ivHp},
            {"name": "Atk", "base": 0, "val": 136, "EV": pokemon.evAttack, "IV": pokemon.ivAttack},
            {"name": "Def", "base": 0, "val": 136, "EV": pokemon.evDefence, "IV": pokemon.ivDefence},
            {"name": "S. Atk", "base": 0, "val": 136, "EV": pokemon.evSpAttack, "IV": pokemon.ivSpAttack},
            {"name": "S. Def", "base": 0, "val": 136, "EV": pokemon.evSpDefence, "IV": pokemon.ivSpDefence},
            {"name": "Speed", "base": 0, "val": 136, "EV": pokemon.evSpeed, "IV": pokemon.ivSpeed}
        ],
        "genders": {
            "all": ["Gender"],
            "selected": pokemon.gender
        },
        "natures": {
            "all": ["Hardy", "Lonely", "Brave", "Adamant", "Naughty", "Bold", "Docile",
            "Relaxed", "Impish", "Lax", "Timid", "Hasty", "Serious", "Jolly", "Naive", "Modest",
            "Mild", "Quiet", "Bashful", "Rash", "Calm", "Gentle", "Sassy", "Careful", "Quirky"],
            "selected": pokemon.nature
        },
        "items": {
            "all": ["Items..."],
            "selected": pokemon.heldItem
        },
        "abilities": {
            "all": ["Ability..."],
            "selected": pokemon.ability
        },
        "moves": {
            "all": ["move..."],
            "selected": [
                {"name": pokemon.move1, "Type": "", "Acc": 0, "Cat": "", "Power": 0, "Pp": 0},
                {"name": pokemon.move2, "Type": "", "Acc": 0, "Cat": "", "Power": 0, "Pp": 0},
                {"name": pokemon.move3, "Type": "", "Acc": 0, "Cat": "", "Power": 0, "Pp": 0},
                {"name": pokemon.move4, "Type": "", "Acc": 0, "Cat": "", "Power": 0, "Pp": 0}
            ]
        }
    }

    const [formData, setFormData] = useState(PokemonFormData);

    let inputRefs =  useRef([]);
    const refElements = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    inputRefs.current = refElements.map(
        (ref, index) => inputRefs.current[index] = React.createRef()
    );

    const changeName = (e) => {
        e.preventDefault();
        let newName = e.target.value;
        if(newName !== "" && e.keyCode === 13) {
            fetch(newName, true);
            for(let i = 0; i < 6; i++) {
                inputRefs.current[i].current.value = 0;
            }
            for(let i = 6; i < 12; i++) {
                inputRefs.current[i].current.value = 31;
            }
            inputRefs.current[12].current.value = 1;
            let newPokemon = {...pokemon};
            for(let i = 13; i < 21; i++) {
                newPokemon[inputRefs.current[i].current.props.inputProps["data-save"]] = "";
                inputRefs.current[i].current.clear();
            }
            setPokemon(newPokemon);
        }
    };

    const calcStats = (pokemon) => {
        pokemon.stats[0].val = Math.floor((pokemon.stats[0].base * 2 + pokemon.stats[0].IV + Math.floor(pokemon.stats[0].EV / 4)) * pokemon.level / 100) + pokemon.level + 10;

        for(let i = 1; i < pokemon.stats.length; i++) {
            pokemon.stats[i].val = calcStatus(pokemon.stats[i], pokemon.level, 1); // TODO replace 1 with nature modifier
        }
        return pokemon;
    }

    const calcStatus = (stat, level, modifier) => {
        return Math.floor((Math.floor((stat.base * 2 + stat.IV + Math.floor(stat.EV / 4)) * level / 100) + 5)*modifier);
    }

    const calcByLevel = (e) => {
        const newLevel = e.target.value;
        const newPokemon = {...formData};
        newPokemon["level"] = parseInt(newLevel);
        setFormData(calcStats(newPokemon));
    }

    const calcByEVIV = (e) => {
        const newValue = e.target.value;
        const newPokemon = {...formData};
        newPokemon.stats[parseInt(e.target.id)][e.target.getAttribute("data-name")] = parseInt(newValue);
        setFormData(calcStats(newPokemon));
    }

    const fetch = (name, clear) => {
        const newPokemon = {...formData};
        if(clear) {
            newPokemon["level"] = 1;
            newPokemon["genders"]["selected"] = "";
            newPokemon.stats.map((stat, i) => (newPokemon.stats[i].EV = 0));
            newPokemon.stats.map((stat, i) => (newPokemon.stats[i].IV = 31));
            newPokemon["natures"]["selected"] = "";
            newPokemon["items"]["selected"] = "";
            newPokemon["abilities"]["selected"] = "";
            newPokemon["moves"]["selected"].map(move => (
                move["name"] = ""
            ));
        }

        let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
        let itemsUrl = `https://pokeapi.co/api/v2/item?offset=0&limit=20000`;

        const requestPokemon = axios.get(pokemonUrl);
        const requestItems = axios.get(itemsUrl);

        axios.all([requestPokemon, requestItems]).then(axios.spread((...responses) => {
            const resPokemon = responses[0];
            const resItems = responses[1];

            newPokemon["id"] = resPokemon.data.id;
            newPokemon["name"] = resPokemon.data.name;
            const types = resPokemon.data.types;
            const stats = resPokemon.data.stats;
            const abilities = resPokemon.data.abilities;
            const moves = resPokemon.data.moves;
            const items = resItems.data.results;

            newPokemon["Types"] = [];
            types.map((type) => (newPokemon.Types.push(type.type.name)));

            stats.map((stat, i) => (newPokemon.stats[i].base = stat.base_stat));

            newPokemon["abilities"]["all"] = [];
            abilities.map(ability => (newPokemon.abilities.all.push(ability.ability.name)));

            newPokemon["moves"]["all"] = ["None"];
            moves.map(move =>(newPokemon.moves.all.push(move.move.name)));


            const itemState = [];
            items.map(item =>(itemState.push(item.name)));
            newPokemon["items"]["all"] = itemState;

            return axios.get(resPokemon.data.species.url);
        })).then(res => {
            const genderRate = res.data.gender_rate;
            newPokemon["genders"]["all"] = getGenders(genderRate);
            setFormData(calcStats(newPokemon));
        })
    }

    const getGenders = (genderRate) => {
        if(genderRate===-1) {
            return ["no gender"];
        } else if(genderRate===0) {
            return ["Male"];
        } else if(genderRate===8) {
            return ["Female"];
        } else {
            return ["Male", "Female"];
        }
    }

    useEffect(() => {
        if(formData.name !== "") {
            fetch(formData.name, false);
        }
    }, []);

    const saveToPokemon = (e) => {
        const newValue = e.target.value;
        let newPokemon = {...pokemon};
        newPokemon[e.target.getAttribute("data-save")] = newValue;
        setPokemon(newPokemon);
        if(["move1", "move2", "move3", "move4"].includes(e.target.getAttribute("data-save"))) {
            let newData = {...formData};
            newData["moves"]["selected"][e.target.getAttribute("data-save").slice(-1)-1]["name"] = newValue;
            setFormData(newData);
        }
    }

    const savePokemon = () => {
        let newPokemon = {...pokemon};
        newPokemon["indexId"] = formData.id;
        newPokemon["name"] = formData.name;
        newPokemon["level"] = formData.level;
        newPokemon["ivHp"] = formData.stats[0].IV;
        newPokemon["ivAttack"] = formData.stats[1].IV;
        newPokemon["ivDefence"] = formData.stats[2].IV;
        newPokemon["ivSpAttack"] =  formData.stats[3].IV;
        newPokemon["ivSpDefence"] =  formData.stats[4].IV;
        newPokemon["ivSpeed"] = formData.stats[5].IV;
        newPokemon["evHp"] = formData.stats[0].EV;
        newPokemon["evAttack"] = formData.stats[1].EV;
        newPokemon["evDefence"] = formData.stats[2].EV;
        newPokemon["evSpAttack"] = formData.stats[3].EV;
        newPokemon["evSpDefence"] = formData.stats[4].EV;
        newPokemon["evSpeed"] = formData.stats[5].EV;
        if(dbTeam!==null) {
            newPokemon["teamId"] = dbTeam[0].teamId;
        }
        let newTeam = [...team];
        newTeam[teamIndex] = newPokemon;
        setTeam(newTeam);

        console.log(newPokemon);
        console.log(dbTeam);
        sendPokemon(newPokemon);
    }

    useEffect(() => {
        if(dbTeam!==null) {
            console.log(dbTeam);
            let newTeam = [...team];
            dbTeam.map(dbPoke => (
                newTeam[dbPoke.position]["id"] = dbPoke.id
            ));
            dbTeam.map(dbPoke => (
                newTeam[dbPoke.position]["teamId"] = dbPoke.teamId
            ));
            setTeam(newTeam);
        }
    }, [dbTeam])

    return(
        <div id="configForm" className={"d-flex flex-column"}>
            <div className="p-0">
                <div className="d-flex flex-row">
                    <div className="p-1">
                        <div style={{ textAlign: "center" }}>
                            <Image
                                thumbnail={true}
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${formData.id}.png`}
                                style={{ width: "90%" ,maxHeight: "auto", backgroundColor: "gray" }}
                            />
                        </div>
                        <div style={{ textAlign: "center" }}>
                            {formData.Types.map((type, i) => (
                                <Badge pill variant={"light"} className={"mr-1"} key={i}>{type}</Badge>
                            ))}
                        </div>
                        <div style={{ marginTop: "15px" }}>
                            <input id={teamIndex} className={"form-control"} placeholder={"Pokemon..."}
                                   defaultValue={formData.name !== "" ? formData.name : null}
                                   onKeyUp={changeName} />
                        </div>
                    </div>
                    <div className={"pl-1 pr-1 pt-1"}>
                        {formData.stats.map((stat, i) => (
                            <div className={"d-flex justify-content-center flex-row pb-2"} key={i}>
                                <div className={"pl-2 pt-2"}><h6>{stat.name}</h6></div>
                                <div className={"pl-3 pt-2 ml-auto"}><h6>{stat.val}</h6></div>
                                <div className={"align-self-center pl-3"}>
                                    <ProgressBar style={{ width: "140px" }}
                                                 variant={"info"}
                                                 animated now={stat.base}
                                                 label={stat.base}
                                                 min={0}
                                                 max={180} />
                                </div>
                                <div className={"align-self-center pr-1"} typeof={"number"} style={{paddingLeft: "20px"}}>
                                    <div className={"d-flex flex-row"}>
                                        <FormControl ref={inputRefs.current[i]} id={i.toString()} data-name={"EV"} size={"sm"} type={"number"} min={0} max={252} placeholder={"EV"} defaultValue={stat.EV} onChange={calcByEVIV} />
                                        <FormControl ref={inputRefs.current[i+6]} id={i.toString()} data-name={"IV"} size={"sm"} type={"number"} min={0} max={31} placeholder={"IV"} defaultValue={stat.IV} onChange={calcByEVIV} />
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
                        <h6 className={"p-2"}>Level</h6>
                        <FormControl ref={inputRefs.current[12]} size={"sm"} value={formData.level} type={"number"} min={1} max={100}
                                     placeholder={"Level"} className={"mr-2"} style={{maxWidth:"70px"}} onChange={calcByLevel}/>
                        <Typeahead ref={inputRefs.current[13]} id={"genders"} size={"sm"} className={"p-0 mr-1"} style={{minWidth:"100px"}}
                                   labelKey={"gender"} options={formData.genders.all}  placeholder={formData.genders.selected===""?"Gender...":formData.genders.selected}
                                    onBlur={saveToPokemon} inputProps={{"data-save": "gender"}}
                        />
                        <Typeahead inputProps={{"data-save": "nature"}} id={"natures"} size={"sm"} className={"p-0 mr-1"} style={{minWidth:"100px"}}
                                   labelKey={"nature"} options={formData.natures.all}  placeholder={formData.natures.selected===""?"Nature...":formData.natures.selected}
                                    onBlur={saveToPokemon} ref={inputRefs.current[14]}
                        />
                        <Typeahead inputProps={{"data-save": "heldItem"}} id={"items"} size={"sm"} className={"p-0 mr-2"} style={{minWidth:"150px"}}
                                   labelKey={"item"} options={formData.items.all}  placeholder={formData.items.selected===""?"Items...":formData.items.selected}
                                    onBlur={saveToPokemon} ref={inputRefs.current[15]}
                        />
                        <Typeahead inputProps={{"data-save": "ability"}} id={"abilities"} size={"sm"} className={"p-0"} style={{minWidth:"130px"}}
                                   labelKey={"ability"} options={formData.abilities.all}  placeholder={formData.abilities.selected===""?"Ability...":formData.abilities.selected}
                                    onBlur={saveToPokemon} ref={inputRefs.current[16]}
                        />
                    </div>
                    <div className="p-0 d-flex justify-content-center">
                        {formData.moves.selected.map((move, i) => (
                            <MoveConfig key={i} index={i} moves={formData.moves.all} move={formData.moves.selected[i]}
                                        save={saveToPokemon} refs={inputRefs.current} teamIndex={teamIndex} />
                        ))}
                    </div>
                    <div className="p-1 d-flex justify-content-end">
                        <Button variant="secondary" size="sm" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="secondary" size="sm" className={"pl-2 ml-2"} onClick={savePokemon}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

PokemonConfig.propTypes = {
    slot: PropTypes.object.isRequired,
    team: PropTypes.array.isRequired,
}

export default PokemonConfig;
