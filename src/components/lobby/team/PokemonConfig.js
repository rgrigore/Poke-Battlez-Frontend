import React, {useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types";
import {Badge, Button, FormControl, Image, ProgressBar} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import axios from "axios";
import MoveConfig from "./MoveConfig";
import {sendPokemon} from "../../../controller/ChatController";

function PokemonConfig({ teamPokemon, onClose }) {

    const [pokemon, setPokemon] = useState(teamPokemon.pokemon.name);
    const [pokemonInfo, setPokemonInfo] = useState({
        gender: teamPokemon.pokemon.gender,
        heldItem: teamPokemon.pokemon.heldItem,
        ability: teamPokemon.pokemon.ability
    });
    const [pokemonSprite, setPokemonSprite] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png");
    const [pokemonType, setPokemonType] = useState([]);

    const [level, setLevel] = useState(teamPokemon.pokemon.level);

    const natures = {
        "Hardy": { up: 1, down: 1 }, "Lonely": { up: 1, down: 2 }, "Adamant": { up: 1, down: 3 }, "Naughty": { up: 1, down: 4 }, "Brave": { up: 1, down: 5 },
        "Bold": { up: 2, down: 1 }, "Docile": { up: 2, down: 2 }, "Impish": { up: 2, down: 3 }, "Lax": { up: 2, down: 4 }, "Relaxed": { up: 2, down: 5 },
        "Modest": { up: 3, down: 1 }, "Mild": { up: 3, down: 2 }, "Bashful": { up: 3, down: 3 }, "Rash": { up: 3, down: 4 }, "Quiet": { up: 3, down: 5 },
        "Calm": { up: 4, down: 1 }, "Gentle": { up: 4, down: 2 }, "Careful": { up: 4, down: 3 }, "Quirky": { up: 4, down: 4 }, "Sassy": { up: 4, down: 5 },
        "Timid": { up: 5, down: 1 }, "Hasty": { up: 5, down: 2 }, "Jolly": { up: 5, down: 3 }, "Naive": { up: 5, down: 4 }, "Serious": { up: 5, down: 5 }
    };
    const [nature, setNature] = useState(teamPokemon.pokemon.nature);

    let calculateHp = (stat, level) => {
        const temp = [...stats];
        temp[stat.index].value = Math.floor((stat.base * 2 + stat.IV + Math.floor(stat.EV / 4)) * level / 100) + level + 10;
        setStats(temp);
    };

    const calculateStat = (stat, level) => {
        const temp = [...stats];
        temp[stat.index].value = Math.floor((Math.floor((stat.base * 2 + stat.IV + Math.floor(stat.EV / 4)) * level / 100) + 5) * stat.nature);
        setStats(temp);
    };

    const [statsChanged, setStatsChanged] = useState(false);
    const [stats, setStats] = useState([
        { name: "Hp", index: 0, value: 0, base: 0, nature: 1, EV: teamPokemon.pokemon.evHp, IV: teamPokemon.pokemon.ivHp, calculate: calculateHp },
        { name: "Atk", index: 1, value: 0, base: 0, nature: 1, EV: teamPokemon.pokemon.evAttack, IV: teamPokemon.pokemon.ivAttack, calculate: calculateStat },
        { name: "Def", index: 2, value: 0, base: 0, nature: 1, EV: teamPokemon.pokemon.evDefence, IV: teamPokemon.pokemon.ivDefence, calculate: calculateStat },
        { name: "Sp. Atk", index: 3, value: 0, base: 0, nature: 1, EV: teamPokemon.pokemon.evSpAttack, IV: teamPokemon.pokemon.ivSpAttack, calculate: calculateStat },
        { name: "Sp. Def", index: 4, value: 0, base: 0, nature: 1, EV: teamPokemon.pokemon.evSpDefence, IV: teamPokemon.pokemon.ivSpDefence, calculate: calculateStat },
        { name: "Speed", index: 5, value: 0, base: 0, nature: 1, EV: teamPokemon.pokemon.evSpeed, IV: teamPokemon.pokemon.ivSpeed, calculate: calculateStat }
    ]);

    const [genders, setGenders] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [items, setItems] = useState([]);

    const [availableMoves, setAvailableMoves] = useState([]);

    const emptyMove = {name: "none", type: "", accuracy: 0, category: "", power: 0, pp: 0};
    const [move1, setMove1] = useState({name: teamPokemon.pokemon.move1, type: "", accuracy: 0, category: "", power: 0, pp: 0});
    const [move2, setMove2] = useState({name: teamPokemon.pokemon.move2, type: "", accuracy: 0, category: "", power: 0, pp: 0});
    const [move3, setMove3] = useState({name: teamPokemon.pokemon.move3, type: "", accuracy: 0, category: "", power: 0, pp: 0});
    const [move4, setMove4] = useState({name: teamPokemon.pokemon.move4, type: "", accuracy: 0, category: "", power: 0, pp: 0});

    const [moves, setMoves] = useState([
        { stats: move1, set: setMove1},
        { stats: move2, set: setMove2},
        { stats: move3, set: setMove3},
        { stats: move4, set: setMove4}
    ]);

    useEffect(() => {
        if (pokemon !== null) {
            fetch(pokemon);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const temp = [...moves];
        temp[0].stats = move1;
        temp[1].stats = move2;
        temp[2].stats = move3;
        temp[3].stats = move4;
        setMoves(temp);

        // eslint-disable-next-line
    }, [move1, move2, move3, move4])

    let inputRefs =  useRef([]);
    const refElements = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    inputRefs.current = refElements.map(
        (ref, index) => inputRefs.current[index] = React.createRef()
    );

    const clearPokemon = () => {
        setPokemonInfo({
            gender: "",
            heldItem: "",
            ability: ""
        })

        setLevel(1);
        setNature("");
        setStats([...stats].map(stat => {
            stat.EV = 0;
            stat.IV = 31;
            stat.nature = 1;
            stat.base = 0;
            return stat;
        }));

        moves.map(move => move.set({...emptyMove}));
    }

    const clearFields = () => {
        // EVs
        for(let i = 0; i < 6; i++) {
            inputRefs.current[i].current.value = 0;
        }

        // IVs
        for(let i = 6; i < 12; i++) {
            inputRefs.current[i].current.value = 31;
        }

        // level
        inputRefs.current[12].current.value = 1;

        // gender, nature, item, ability, moves
        for (let i = 13; i < 21; i++) {
            inputRefs.current[i].current.clear();
        }
    }

    const changePokemon = (e) => {
        e.preventDefault();
        let newPokemonName = e.target.value;

        if(newPokemonName !== "" && e.keyCode === 13) {
            clearFields();
            clearPokemon();

            fetch(newPokemonName);
        }
    };

    const NATURE_MODIFIER = 0.1;
    useEffect(() => {
        if (nature !== "") {
            const temp = [...stats];
            temp[natures[nature].up].nature += NATURE_MODIFIER;
            temp[natures[nature].down].nature += -NATURE_MODIFIER;
            setStats(temp);
        }

        setStatsChanged(true);

        // eslint-disable-next-line
    }, [nature]);

    const setEvIv = e => {
        const newValue = parseInt(e.target.value);

        const temp = [...stats];
        temp[parseInt(e.target.id)][e.target.getAttribute("data-name")] = newValue;
        setStats(temp);

        setStatsChanged(true);
    }

    useEffect(() => {
        if (statsChanged) {
            stats.map(stat => stat.calculate(stat, level));
            setStatsChanged(false);
        }
        // eslint-disable-next-line
    }, [statsChanged]);

    const setPokemonLevel = e => {
        setLevel(parseInt(e.target.value));
        setStatsChanged(true);
    }

    const setPokemonNature = e => {
        const newNature = e.target.value;
        if (natures.hasOwnProperty(newNature)) {
            setNature(newNature);
        }
    }

    const fetch = (name) => {
        let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
        let itemsUrl = `https://pokeapi.co/api/v2/item?offset=0&limit=20000`;

        const requestPokemon = axios.get(pokemonUrl);
        const requestItems = axios.get(itemsUrl);

        axios.all([requestPokemon, requestItems])
            .then(axios.spread((...responses) => {
                const resPokemon = responses[0];
                const resItems = responses[1];

                setPokemon(resPokemon.data.name);
                setPokemonType(resPokemon.data.types.map(type => type.type.name));
                setStats([...stats].map((stat, index) => {
                    stat.base = resPokemon.data.stats[index].base_stat;
                    return stat;
                }));
                setAbilities(resPokemon.data.abilities.map(ability => ability.ability.name));
                setAvailableMoves(resPokemon.data.moves.map(move => move.move.name));
                setPokemonSprite(resPokemon.data.sprites.front_default);

                setItems(resItems.data.results.map(item => item.name));

                setStatsChanged(true);

                return axios.get(resPokemon.data.species.url);
            }))
            .then(res => {
                setAvailableGenders(res.data.gender_rate);
            })
    }

    const setAvailableGenders = genderRate => {
        switch (genderRate) {
            case -1: setGenders(["genderless"]); break;
            case 0: setGenders(["Male"]); break;
            case 8: setGenders(["Female"]); break;
            default: setGenders(["Male", "Female"]);
        }
    }

    const updatePokemonInfo = e => {
        const target = e.target;

        const temp = {...pokemonInfo};
        temp[target.dataset.field] = target.value;
        setPokemonInfo(temp);
    }

    const savePokemon = () => {
        const pokemonData = {
            id: teamPokemon.pokemon.id,
            teamId: teamPokemon.pokemon.teamId,
            position: teamPokemon.pokemon.position,
            name: pokemon,
            level: level,
            ivHp: stats[0].IV,
            ivAttack: stats[1].IV,
            ivDefence: stats[2].IV,
            ivSpAttack: stats[3].IV,
            ivSpDefence: stats[4].IV,
            ivSpeed: stats[5].IV,
            evHp: stats[0].EV,
            evAttack: stats[1].EV,
            evDefence: stats[2].EV,
            evSpAttack: stats[3].EV,
            evSpDefence: stats[4].EV,
            evSpeed: stats[5].EV,
            gender: pokemonInfo.gender,
            nature: nature,
            heldItem: pokemonInfo.heldItem,
            ability: pokemonInfo.ability,
            move1: move1.name,
            move2: move2.name,
            move3: move3.name,
            move4: move4.name,

            sprite: pokemonSprite
        }
        teamPokemon.set(pokemonData);
        sendPokemon(pokemonData);
    }

    useEffect(() => {
        teamPokemon.set({...teamPokemon.pokemon, sprite: pokemonSprite});
        // eslint-disable-next-line
    }, [pokemonSprite]);

    return(
        <div id="configForm" className={"d-flex flex-column"}>
            <div className="p-0">
                <div className="d-flex flex-row">
                    <div className="p-1">
                        <div style={{ textAlign: "center" }}>
                            <Image thumbnail={true} src={ pokemonSprite }
                                   style={{ width: "90%" ,maxHeight: "auto", backgroundColor: "gray" }} />
                        </div>
                        <div style={{ textAlign: "center" }}>
                            { pokemonType.map((type, i) => (
                                <Badge pill variant={"light"} className={"mr-1"} key={i}>{type}</Badge>
                            ))}
                        </div>
                        <div style={{ marginTop: "15px" }}>
                            <input id={ teamPokemon.pokemon.position } className={"form-control"} placeholder={"Pokemon..."}
                                   defaultValue={pokemon !== "" ? pokemon : null}
                                   onKeyUp={changePokemon} />
                        </div>
                    </div>
                    <div className={"pl-1 pr-1 pt-1"}>
                        {stats.map((stat, i) => (
                            <div className={"d-flex justify-content-center flex-row pb-2"} key={i}>
                                <div className={"pl-2 pt-2"} style={{minWidth: "65px"}}><h6>{stat.name}</h6></div>
                                <div className={"pl-3 pt-2 ml-auto"} style={{minWidth: "45px"}}><h6>{stat.value}</h6></div>
                                <div className={"align-self-center pl-3"}>
                                    <ProgressBar style={{ width: "140px" }} variant={"info"} animated label={stat.base}
                                                 now={stat.base} min={0} max={180} />
                                </div>
                                <div className={"align-self-center pr-1"} typeof={"number"} style={{paddingLeft: "20px"}}>
                                    <div className={"d-flex flex-row"}>
                                        <FormControl ref={inputRefs.current[i]} id={i.toString()} data-name={"EV"} size={"sm"} type={"number"} min={0} max={252} placeholder={"EV"} defaultValue={stat.EV} onChange={setEvIv} />
                                        <FormControl ref={inputRefs.current[i+6]} id={i.toString()} data-name={"IV"} size={"sm"} type={"number"} min={0} max={31} placeholder={"IV"} defaultValue={stat.IV} onChange={setEvIv} />
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
                        <FormControl ref={inputRefs.current[12]} size={"sm"} value={ level } type={"number"} min={1} max={100}
                                     placeholder={"Level"} className={"mr-2"} style={{maxWidth:"70px"}} onChange={setPokemonLevel}/>
                        <Typeahead id={"genders"} inputProps={{"data-field": "gender"}} size={"sm"} className={"p-0 mr-1"} style={{minWidth:"100px"}}
                                   labelKey={"gender"} options={genders}  placeholder={ pokemonInfo.gender === "" ? "Gender..." : pokemonInfo.gender }
                                   onBlur={updatePokemonInfo} ref={inputRefs.current[13]} />
                        <Typeahead id={"natures"} inputProps={{"data-field": "nature"}} size={"sm"} className={"p-0 mr-1"} style={{minWidth:"100px"}}
                                   labelKey={"nature"} options={Object.keys(natures)}  placeholder={nature === "" ? "Nature..." : nature}
                                   onBlur={setPokemonNature} ref={inputRefs.current[14]} />
                        <Typeahead id={"items"} inputProps={{"data-field": "heldItem"}} size={"sm"} className={"p-0 mr-2"} style={{minWidth:"150px"}}
                                   labelKey={"item"} options={items}  placeholder={pokemonInfo.heldItem === "" ? "Item..." : pokemonInfo.heldItem}
                                   onBlur={updatePokemonInfo} ref={inputRefs.current[15]} />
                        <Typeahead id={"abilities"} inputProps={{"data-field": "ability"}} size={"sm"} className={"p-0"} style={{minWidth:"130px"}}
                                   labelKey={"ability"} options={abilities}  placeholder={pokemonInfo.ability === "" ? "Ability..." : pokemonInfo.ability}
                                   onBlur={updatePokemonInfo} ref={inputRefs.current[16]} />
                    </div>
                    <div className="p-0 d-flex justify-content-center">
                        { moves.map((move, i) => (
                            <MoveConfig key={i} moves={availableMoves} move={move} index={i}
                                        refs={inputRefs.current} teamIndex={ teamPokemon.pokemon.position } />
                        )) }
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
    teamPokemon: PropTypes.object.isRequired
}

export default PokemonConfig;
