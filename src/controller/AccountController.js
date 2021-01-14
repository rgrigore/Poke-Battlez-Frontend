import { Client } from "@stomp/stompjs/esm6";

const SOCKET = "ws://localhost:8080/account-management"
const REGISTER_TOPIC = "/app/account/register/";
const LOGIN_TOPIC = "/app/account/login/";
const CONFIRM_TOPIC = "/account/confirm/";

let client = [];

let authenticated = false;
let user = {
	username: "",
	id: ""
}

export function connect() {
	console.log("Account connect");
	client.push(new Client({
		brokerURL: SOCKET,
		connectHeaders: {},
		debug: function (str) {
			console.log("Account: " + str);
		},
		reconnectDelay: 5000,
		heartbeatIncoming: 4000,
		heartbeatOutgoing: 4000,
	}));

	client[0].onConnect = () => console.log("connected to account");

	client[0].onStompError = frame => {
		console.log('Broker reported error: ' + frame.headers['message']);
		console.log('Additional details: ' + frame.body);
	}

	client[0].activate();
}

function subscribeForConfirmation(key, callback) {
	let subscription;
	subscription = client[0].subscribe(CONFIRM_TOPIC + key, confirmation => {
		subscription.unsubscribe();
		validateConfirmation(JSON.parse(confirmation.body), callback);
	});
}

function validateConfirmation(confirmation, callback) {
	if (confirmation.hasOwnProperty("state") && confirmation.state === true) {
		user.username = confirmation.username;
		user.id = confirmation.id;
		authenticated = true;
	}
	callback(authenticated);
}

export function register(form, callback) {
	let key = Math.floor(Math.random() * 10000000);

	subscribeForConfirmation(key, callback);
	client[0].publish({
		destination: REGISTER_TOPIC + key,
		body: JSON.stringify(form)
	});
}

export function login(form, callback) {
	let key = Math.floor(Math.random() * 10000000);

	subscribeForConfirmation(key, callback);
	client[0].publish({
		destination: LOGIN_TOPIC + key,
		body: JSON.stringify(form)
	});
}

export function isAuthenticated() {
	return authenticated;
}

export function getUser() {
	return user;
}