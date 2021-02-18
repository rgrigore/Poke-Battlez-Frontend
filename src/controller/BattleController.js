import {Client} from "@stomp/stompjs/esm6";

const SOCKET = "ws://localhost:8080/battle";
const GENERAL_SEND = "/app/battle/";
const BATTLE_RECEIVE_TOPIC = "/battle/";

let client = [];
let _battleData = {battleId: "", trainers: [], trainerNames: {}, trainerTeams: {}, availablePokemon: {}};

export function connect(userId, setTeam, setNewMessage, setTeamHp, setCurrentPokemonIndex, setOpponentTeam, setCurrentOpponentPokemon, setActed) {
    // console.log("Chat connect")

    client.push(new Client({
        brokerURL: SOCKET,
        connectHeaders: {},
        debug: function (str) {
            // console.log("Chat: " + str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    }));

    client[0].onConnect = frame => {
        client[0].subscribe(BATTLE_RECEIVE_TOPIC + _battleData.battleId + "/team/" + userId, teamPacket => {
            const team = [];
            for (const pokemon of JSON.parse(teamPacket.body)) {
                team.push({
                    name: pokemon.name,
                    id: pokemon.id,
                    currentHp: pokemon.hp,
                    hp: pokemon.hp,
                    position: pokemon.position,
                    types: pokemon.types,
                    moves: pokemon.moves,
                    frontSprite: pokemon.frontSprite,
                    backSprite: pokemon.backSprite
                })
            }
            console.log(team);
            setTeam(team);
        });

        client[0].subscribe(BATTLE_RECEIVE_TOPIC + _battleData.battleId, battle => {
            let json = JSON.parse(battle.body)

            console.log(json)

            for (const message of json.log) {
                setNewMessage({name: null, body: message});
            }

            let teamHp = {};
            Object.entries(json.currentHealths[userId]).forEach((id, hp) => teamHp[id] = hp);
            setTeamHp(teamHp);

            let opponentTeamHp = [false, false, false, false, false, false];
            json.opponents[userId].forEach(pokemon => opponentTeamHp[pokemon.position] = pokemon.currentHp > 0);
            setOpponentTeam(opponentTeamHp);

            for (const pokemon of json.opponents[userId]) {
                if (pokemon.active) {
                    setCurrentOpponentPokemon(pokemon);
                    break;
                }
            }

            setCurrentPokemonIndex(json.active[userId])

            setActed(false);
        });

        client[0].publish({
            destination: GENERAL_SEND + _battleData.battleId + "/connect",
            body: JSON.stringify({playerId: userId})
        });
    };

    client[0].onStompError = frame => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
    }

    client[0].activate();
}

export function sendMove(playerId, moveName, targetId) {
    client[0].publish({
        destination: GENERAL_SEND + _battleData.battleId + "/move",
        body: JSON.stringify({playerId: playerId, move: moveName, targetId: targetId})
    });
}

export function sendSwitch(playerId, pokemonIndex) {
    client[0].publish({
        destination: GENERAL_SEND + _battleData.battleId + "/switch",
        body: JSON.stringify({playerId: playerId, index: pokemonIndex})
    });
}

export function sendCancel(playerId) {
    client[0].publish({
        destination: GENERAL_SEND + _battleData.battleId + "/cancel",
        body: JSON.stringify({playerId: playerId})
    });
}

export function setBattleData(battleData) {
    console.log(battleData);
    _battleData = battleData;
}
