import * as Discord from "discord.js";
import * as Commands from "./commands";

import firebase from "firebase";

if (!process.env.FIREBASE_API_KEY || !process.env.DISCORD_BOT_TOKEN) {
	throw new Error("Unable to locate at least one of FIREBASE_API_KEY or DISCORD_BOT_TOKEN environment variables")
}


if (firebase.apps.length == 0) {
	firebase.initializeApp({
		apiKey: process.env.FIREBASE_API_KEY,
		authDomain: "discordphotosbot.firebaseapp.com",
		projectId: "discordphotosbot",
		storageBucket: "discordphotosbot.appspot.com",
		messagingSenderId: "705173176849",
		appId: "1:705173176849:web:91644cd19d1c363cf4e7b0"
	});
}
const app = firebase.apps[0];

const client = new Discord.Client();

const TOKEN = process.env.DISCORD_BOT_TOKEN;

client.on("message", async (message) => {

	if (!message.channel.isText()) {
		return;
	}

	if (message.content.charAt(0) == "$" && message.content !== "$help") {
		return Commands.post(message, [message.content.substring(1)], false)
	}

	// https://stackoverflow.com/a/16261693/5511561
	const tokens = message.content.match(/(?:[^\s"]+|"[^"]*")+/g);
	if (!tokens) {
		return;
	}

	const command = tokens[0];
	const args = tokens.slice(1);
	switch (command) {
		case "!ping":
			return Commands.ping(message);
		case "!add":
			return Commands.add(message, args);
		case "!post":
			return Commands.post(message, args);
		case "!remove":
			return Commands.remove(message, args);
		case "!help":
		case "$help":
			return Commands.help(message);
	}
});
client.on("ready", () => {
	console.log("Ready");
});

client.login(TOKEN);
