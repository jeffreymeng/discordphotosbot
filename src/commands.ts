import { Message } from "discord.js";
import firebase from "firebase";
import * as Discord from "discord.js";

if (firebase.apps.length == 0) {
	firebase.initializeApp({
		apiKey: "AIzaSyAMK2wmeTASZrutU26aLH54Q0dtUdazScQ",
		authDomain: "discordphotosbot.firebaseapp.com",
		projectId: "discordphotosbot",
		storageBucket: "discordphotosbot.appspot.com",
		messagingSenderId: "705173176849",
		appId: "1:705173176849:web:3485738937494d86f4e7b0",
	});
}
const app = firebase.apps[0];

export async function ping(message: Message) {
	const ping = Date.now() - message.createdTimestamp + " ms";
	message.reply(`Pong! (${Date.now() - message.createdTimestamp}ms)`);
}

const saveImage = (server: string, name: string, url: string) => {
	app.firestore()
		.collection("servers")
		.doc(server)
		.collection("photos")
		.doc(name)
		.set({ data: url });
};

export async function add(message: Message, args: string[]) {
	const server = (message.channel as Discord.TextChannel).guild.id;
	let name = args[0];
	let url;
	if (args.length == 0 || args[0] == "help" || args.length > 2) {
		return message.channel.send(
			"Usage:\n1. `!add [name] [URL of photo]` (with exactly zero attachments)\n2. `!add [name]` (with exactly one photo as an attachment)"
		);
	}
	if (message.attachments.array().length == 1 && args.length == 1) {
		url = message.attachments.array()[0].url;
	} else if (message.attachments.array().length == 0 && args.length == 2) {
		url = args[1];
	}
	if (!url) {
		return message.channel.send(
			"Usage:\n1. `!add [name] [URL of photo]` (with exactly zero attachments)\n2. `!add [name]` (with exactly one photo as an attachment)"
		);
	}
	const data = await app
		.firestore()
		.collection("servers")
		.doc(server)
		.collection("photos")
		.doc(name)
		.get();
	if (data.data()?.data) {
		return message.reply("That id has already been taken!");
	}
	await app
		.firestore()
		.collection("servers")
		.doc(server)
		.collection("photos")
		.doc(name)
		.set({ data: url });
	return message.reply("Successfully added `" + name + "`");
}

export async function post(
	message: Message,
	args: string[],
	errorIfNotFound = true
) {
	const server = (message.channel as Discord.TextChannel).guild.id;
	if (args.length < 1 || args[0] == "help") {
		return message.channel.send(
			"Usage: `!post [name]`\nYou can also do `$[name]`"
		);
	}
	const snapshot = await app
		.firestore()
		.collection("servers")
		.doc(server)
		.collection("photos")
		.doc(args[0])
		.get();
	const data = snapshot.data();
	if (data) {
		const discordCDNUrl = "https://cdn.discordapp.com";
		if (data?.data.substring(0, discordCDNUrl.length) == discordCDNUrl) {
			return message.channel.send("", { files: [data?.data] });
		} else {
			return message.channel.send(data?.data);
		}

	}
	if (errorIfNotFound) {
		return message.reply(
			"An image with that ID does not exist in this server."
		);
	}
}

export async function remove(message: Message, args: string[]) {
	if (args.length !== 1 || args[0] == "help") {
		return message.channel.send("Usage: `!remove [name]`");
	}
	const name = args[0];
	if (
		!message.member?.hasPermission("MANAGE_GUILD") &&
		message.author.id !== "272850502369148930"
	) {
		return message.channel.send(
			"You must have the `Manage Server` permission to do that!"
		);
	}
	const server = (message.channel as Discord.TextChannel).guild.id;

	await app
		.firestore()
		.collection("servers")
		.doc(server)
		.collection("photos")
		.doc(name)
		.delete();

	return message.reply("Successfully deleted `" + name + "`");
}

export async function help(message: Message) {
	return message.channel.send("**Help**\n" +
		"- **!ping**: Return's the ping of the bot\n" +
		"- **!add [nickname]** _With exactly one attachment, a photo_: Adds the attached photo with the nickname to the bot's database.\n" +
		"- **!add [nickname] \"[text]\"**: Adds text to the database, so the text (in quotes) is reposted instead of an image.\n" +
		"- **!add [nickname] [url to image]**: Adds the photo with the nickname to the bot's database.\n" +
		"- **!post [nickname]**: posts the image stored with the given nickname.\n" +
		"- **:[nickname]** _(no space between thr `$` and the name)_: Shortcut, same as `!post [nickname]`, except it will ignore any non-existing nicknames rather than sending an error message.\n" +
		"- **!remove [nickname]**: removes the image stored with the given nickname. Can only be called by a user with the _Manage Server_ permission.\n");
}