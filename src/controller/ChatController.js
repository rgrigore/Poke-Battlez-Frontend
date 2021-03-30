import {Client} from "@stomp/stompjs/esm6";
import {setBattleData} from "./BattleController";

const SOCKET = "ws://localhost:8080/chat-lobby";
const RECEIVE_CHAT_TOPIC = "/chat/lobby";
const SEND_CHAT_TOPIC = "/app/message/lobby";
const PRIVATE_CHAT_TOPIC = "/chat/private/";
const PRIVATE_CHAT_SEND = "/app/chat/private";
const RECEIVE_CHAT_USERS_TOPIC = "/chat/lobby/users";
const CHALLENGE_SEND = "/app/chat/challenge";
const CHALLENGE_TOPIC = "/chat/challenge/";
const BATTLE_LOAD = "/battle/load/";
const BATTLE_START = "/battle/start/";
const SEND_CHALLENGE_RESPONSE = "/app/chat/challenge/accept";

let client = [];
let _connected = false;

export function connect(updateUsers, updateMessages, setChallenger, showChallenge, changeRoute, userId, battleLoader) {
	client.push(new Client({
		brokerURL: SOCKET,
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token")
		},
		debug: function (str) {
			// console.log("Chat: " + str);
		},
		reconnectDelay: 5000,
		heartbeatIncoming: 4000,
		heartbeatOutgoing: 4000,
	}));
	// client[0].connectHeaders = {Authorization: "Bearer " + localStorage.getItem("token")};
	client[0].onConnect = frame => {
		client[0].subscribe(RECEIVE_CHAT_USERS_TOPIC, users => updateUsers(JSON.parse(users.body)), {user: userId});
		client[0].subscribe(RECEIVE_CHAT_TOPIC, message => updateMessages(JSON.parse(message.body)));
		client[0].subscribe(PRIVATE_CHAT_TOPIC + frame.headers["user-name"], message => {
			let json = JSON.parse(message.body)
			updateMessages({
				name: json.sender ? "To " + json.to.name : "From " + json.from.name,
				body: json.body
			})
		});
		client[0].subscribe(CHALLENGE_TOPIC + frame.headers["user-name"], challenge => {
				updateMessages({
					name: "Challenged by",
					body: JSON.parse(challenge.body).from.name
				});
				setChallenger({
					id: JSON.parse(challenge.body).from.id,
					name: JSON.parse(challenge.body).from.name
				});
				showChallenge(true);
		});

		client[0].subscribe(BATTLE_LOAD + frame.headers["user-name"], () => {
			battleLoader(true);
		});

		client[0].subscribe(BATTLE_START + frame.headers["user-name"], confirmation => {
			setBattleData(JSON.parse(confirmation.body));
			changeRoute("/battle");
		});
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

export function sendMessage(message) {
	client[0].publish({
		destination: SEND_CHAT_TOPIC,
		body: JSON.stringify({body: message})
	});
}

export function sendPrivate(to, message) {
	client[0].publish({
		destination: PRIVATE_CHAT_SEND,
		body: JSON.stringify({to: to, body: message})
	})
}

export function sendChallenge(to) {
	client[0].publish({
		destination: CHALLENGE_SEND,
		body: JSON.stringify({to: to.id})
	});
}

export function sendChallengeResponse(response, from) {
	client[0].publish({
		destination: SEND_CHALLENGE_RESPONSE,
		body: JSON.stringify({accept: response, from: from})
	});
}