import {Client} from "@stomp/stompjs/esm6";

const SOCKET = "ws://localhost:8080/battle";
const GENERAL_SEND = "/app/battle/";
const BATTLE_RECEIVE_TOPIC = "/battle/";

let client = [];
let _connected = false;
let _battleData = {battleId: "", trainers: [], trainerNames: {}, trainerTeams: {}, availablePokemon: {}};

export function connect(userId, setNewMessage, setTeamHp, setOpponentTeamHp, setCurrentPokemonIndex, setCurrentOpponentPokemonIndex) {
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
        client[0].subscribe(BATTLE_RECEIVE_TOPIC, battle => {
            let json = JSON.parse(battle.body)

            console.log(JSON.parse(battle.body))

            for (const message in json.log) {
                setNewMessage({user: null, message: message});
            }
            // json.currentHealths.get(userId).forEach(pokemon => ) //TODO set teamHp
            // setOpponentTeamHp() //TODO set opponentTeamHp
            setCurrentPokemonIndex(json.active[userId])
            const opponentId = _battleData.trainers.filter(trainer => trainer !== userId).pop()
            setCurrentOpponentPokemonIndex(json.active[opponentId])
        })

        _connected = true;
    };

    client[0].onStompError = frame => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
    }

    client[0].activate();
}

export function isConnected() {
    return _connected;
}

export function sendMove(playerId, moveIndex, targetId) {
    client[0].publish({
        destination: GENERAL_SEND + _battleData.battleId + "/move",
        body: JSON.stringify({id: playerId, index: moveIndex, target: targetId})
    });
}

export function sendSwitch(playerId, pokemonIndex) {
    client[0].publish({
        destination: GENERAL_SEND + _battleData.battleId + "/switch",
        body: JSON.stringify({id: playerId, index: pokemonIndex})
    });
}

export function sendCancel(playerId) {
    client[0].publish({
        destination: GENERAL_SEND + _battleData.battleId + "/cancel",
        body: JSON.stringify({id: playerId})
    });
}

export function startBattle(battleData) {
    _battleData = battleData;

}
