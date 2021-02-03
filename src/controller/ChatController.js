import {Client} from "@stomp/stompjs/esm6";
import {getUser} from "./AccountController";

const SOCKET = "ws://localhost:8080/chat-lobby";
const RECEIVE_CHAT_TOPIC = "/chat/lobby";
const SEND_CHAT_TOPIC = "/app/message/lobby";
const PRIVATE_CHAT_TOPIC = "chat/private/";
const PRIVATE_CHAT_SEND = "/app/chat/private"
const RECEIVE_CHAT_USERS_TOPIC = "/chat/lobby/users";
const POKEMON_SEND_TOPIC = "/app/chat/pokemon";
const TEAM_RECEIVE_TOPIC = "/chat/team/";

let client = [];

export function connect(updateMessages, updateUsers, updatePokemon) {
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
		client[0].subscribe(RECEIVE_CHAT_TOPIC, message => updateMessages(JSON.parse(message.body)), {user: getUser().id});
		client[0].subscribe(RECEIVE_CHAT_USERS_TOPIC, users => updateUsers(JSON.parse(users.body)));
		client[0].subscribe(PRIVATE_CHAT_TOPIC + frame.headers["user-name"], message => {
			let json = JSON.parse(message.body)
			updateMessages({
				name: json.sender ? "To " + json.to.name : "From " + json.from.name,
				body: json.body
			})
		});
		client[0].subscribe(TEAM_RECEIVE_TOPIC + frame.headers["user-name"], team => updatePokemon(JSON.parse(team.body)));
	};

	client[0].onStompError = frame => {
		console.log('Broker reported error: ' + frame.headers['message']);
		console.log('Additional details: ' + frame.body);
	}

	client[0].activate();
}

export function sendMessage(message) {
	client[0].publish({
		destination: SEND_CHAT_TOPIC,
		body: JSON.stringify({body: message})
	});
}

export function sendPokemon(pokemon) {
	client[0].publish({
		destination: POKEMON_SEND_TOPIC,
		body: JSON.stringify(pokemon)
	});
}

export function sendPrivate(to, message) {
	client[0].publish({
		destination: PRIVATE_CHAT_SEND,
		body: JSON.stringify({to: to, body: message})
	})
}