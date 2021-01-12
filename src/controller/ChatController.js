import * as SockJs from 'sockjs-client';

const stompJs = require("stompjs");

const SOCKET = "/chat-lobby";
const RECEIVE = "/chat/lobby";
const SEND = "/app/message/lobby";

let stompClient = null;

export function connect(updateMessages) {
  let socket = new SockJs("http://localhost:8080/chat-lobby");
  stompClient = stompJs.over(socket);
  stompClient.connect({}, frame => {
    console.log("connected: " + frame);
    stompClient.subscribe(RECEIVE, chatMessage => updateMessages(JSON.parse(chatMessage.body).body));
  })
}

export function sendMessage(message) {
  stompClient.send(SEND, {}, JSON.stringify({body: message}));
}