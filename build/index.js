"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Discord = require("discord.js");
var Commands = require("./commands");
var firebase_1 = require("firebase");
console.log("Received api keys");
console.log(process.env.FIREBASE_API_KEY);
console.log(process.env.DISCORD_BOT_TOKEN);
if (!process.env.FIREBASE_API_KEY || !process.env.DISCORD_BOT_TOKEN) {
    throw new Error("Unable to locate at least one of FIREBASE_API_KEY or DISCORD_BOT_TOKEN environment variables");
}
if (firebase_1["default"].apps.length == 0) {
    firebase_1["default"].initializeApp({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: "discordphotosbot.firebaseapp.com",
        projectId: "discordphotosbot",
        storageBucket: "discordphotosbot.appspot.com",
        messagingSenderId: "705173176849",
        appId: "1:705173176849:web:91644cd19d1c363cf4e7b0"
    });
}
var app = firebase_1["default"].apps[0];
var client = new Discord.Client();
var TOKEN = process.env.DISCORD_BOT_TOKEN;
client.on("message", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var tokens, command, args;
    return __generator(this, function (_a) {
        if (!message.channel.isText()) {
            return [2 /*return*/];
        }
        if (message.content.charAt(0) == "$" && message.content !== "$help") {
            return [2 /*return*/, Commands.post(message, [message.content.substring(1)], false)];
        }
        tokens = message.content.match(/(?:[^\s"]+|"[^"]*")+/g);
        if (!tokens) {
            return [2 /*return*/];
        }
        command = tokens[0];
        args = tokens.slice(1);
        switch (command) {
            case "!ping":
                return [2 /*return*/, Commands.ping(message)];
            case "!add":
                return [2 /*return*/, Commands.add(message, args)];
            case "!post":
                return [2 /*return*/, Commands.post(message, args)];
            case "!remove":
                return [2 /*return*/, Commands.remove(message, args)];
            case "!help":
            case "$help":
                return [2 /*return*/, Commands.help(message)];
        }
        return [2 /*return*/];
    });
}); });
client.on("ready", function () {
    console.log("Ready");
});
client.login(TOKEN);
