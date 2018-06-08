'use strict'

const SERVER_URL = 'ws://localhost:7777';
const SERVER_CONNECTION_INTERVAL = 10000; //ms
console.log('hello from script.js');

let orderServer = null;

const tryConnectWs = () => {
	if(orderServer) {
		if(connectTimer){
			clearInterval(connectTimer);
		}
		console.log('timer stop');
		return;
	}
	console.log("connecting");
	let s = new WebSocket(SERVER_URL);
	s.onopen = () => {
		console.log('socket is opened');
		orderServer = s;
		s.onmessage = (e) => {
			console.log(e);
			let recmes = null;
			try{
				recmes = JSON.parse(e.data);
			}
			catch(e) {
				console.error(`JSON parse Error ${e.data}`);
			}
			if(recmes)
				handleMessage(recmes);
		}
		s.onerror = (e) => {
			console.log('onerror');
			console.log(e);
		}
		s.onclose = (e) => {
			console.log(e);
			orderServer = null;
			connectTimer = setInterval(tryConnectWs, SERVER_CONNECTION_INTERVAL);
		}
	}
}

let connectTimer = (() => {
	tryConnectWs();
	return setInterval(tryConnectWs, SERVER_CONNECTION_INTERVAL);
})();

function handleMessage(e) {
	console.log(e);
	addAccounts(e.acc);
}

function sendMessage(message){
	if(orderServer){
		orderServer.send(JSON.stringify(message));
	} else {
		console.error(`orderServer is none`);
	}
}


