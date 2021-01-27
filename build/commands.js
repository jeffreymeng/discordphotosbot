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
exports.help = exports.remove = exports.post = exports.add = exports.ping = void 0;
var firebase_1 = require("firebase");
if (firebase_1["default"].apps.length == 0) {
    firebase_1["default"].initializeApp({
        apiKey: "AIzaSyAMK2wmeTASZrutU26aLH54Q0dtUdazScQ",
        authDomain: "discordphotosbot.firebaseapp.com",
        projectId: "discordphotosbot",
        storageBucket: "discordphotosbot.appspot.com",
        messagingSenderId: "705173176849",
        appId: "1:705173176849:web:3485738937494d86f4e7b0"
    });
}
var app = firebase_1["default"].apps[0];
function ping(message) {
    return __awaiter(this, void 0, void 0, function () {
        var ping;
        return __generator(this, function (_a) {
            ping = Date.now() - message.createdTimestamp + " ms";
            message.reply("Pong! (" + (Date.now() - message.createdTimestamp) + "ms)");
            return [2 /*return*/];
        });
    });
}
exports.ping = ping;
var saveImage = function (server, name, url) {
    app.firestore()
        .collection("servers")
        .doc(server)
        .collection("photos")
        .doc(name)
        .set({ data: url });
};
function add(message, args) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var server, name, url, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    server = message.channel.guild.id;
                    name = args[0];
                    if (args.length == 0 || args[0] == "help" || args.length > 2) {
                        return [2 /*return*/, message.channel.send("Usage:\n1. `!add [name] [URL of photo]` (with exactly zero attachments)\n2. `!add [name]` (with exactly one photo as an attachment)")];
                    }
                    if (message.attachments.array().length == 1 && args.length == 1) {
                        url = message.attachments.array()[0].url;
                    }
                    else if (message.attachments.array().length == 0 && args.length == 2) {
                        url = args[1];
                    }
                    if (!url) {
                        return [2 /*return*/, message.channel.send("Usage:\n1. `!add [name] [URL of photo]` (with exactly zero attachments)\n2. `!add [name]` (with exactly one photo as an attachment)")];
                    }
                    return [4 /*yield*/, app
                            .firestore()
                            .collection("servers")
                            .doc(server)
                            .collection("photos")
                            .doc(name)
                            .get()];
                case 1:
                    data = _b.sent();
                    if ((_a = data.data()) === null || _a === void 0 ? void 0 : _a.data) {
                        return [2 /*return*/, message.reply("That id has already been taken!")];
                    }
                    return [4 /*yield*/, app
                            .firestore()
                            .collection("servers")
                            .doc(server)
                            .collection("photos")
                            .doc(name)
                            .set({ data: url })];
                case 2:
                    _b.sent();
                    return [2 /*return*/, message.reply("Successfully added `" + name + "`")];
            }
        });
    });
}
exports.add = add;
function post(message, args, errorIfNotFound) {
    if (errorIfNotFound === void 0) { errorIfNotFound = true; }
    return __awaiter(this, void 0, void 0, function () {
        var server, snapshot, data, discordCDNUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    server = message.channel.guild.id;
                    if (args.length < 1 || args[0] == "help") {
                        return [2 /*return*/, message.channel.send("Usage: `!post [name]`\nYou can also do `$[name]`")];
                    }
                    return [4 /*yield*/, app
                            .firestore()
                            .collection("servers")
                            .doc(server)
                            .collection("photos")
                            .doc(args[0])
                            .get()];
                case 1:
                    snapshot = _a.sent();
                    data = snapshot.data();
                    if (data) {
                        discordCDNUrl = "https://cdn.discordapp.com";
                        if ((data === null || data === void 0 ? void 0 : data.data.substring(0, discordCDNUrl.length)) == discordCDNUrl) {
                            return [2 /*return*/, message.channel.send("", { files: [data === null || data === void 0 ? void 0 : data.data] })];
                        }
                        else {
                            return [2 /*return*/, message.channel.send(data === null || data === void 0 ? void 0 : data.data)];
                        }
                    }
                    if (errorIfNotFound) {
                        return [2 /*return*/, message.reply("An image with that ID does not exist in this server.")];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.post = post;
function remove(message, args) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var name, server;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (args.length !== 1 || args[0] == "help") {
                        return [2 /*return*/, message.channel.send("Usage: `!remove [name]`")];
                    }
                    name = args[0];
                    if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission("MANAGE_GUILD")) &&
                        message.author.id !== "272850502369148930") {
                        return [2 /*return*/, message.channel.send("You must have the `Manage Server` permission to do that!")];
                    }
                    server = message.channel.guild.id;
                    return [4 /*yield*/, app
                            .firestore()
                            .collection("servers")
                            .doc(server)
                            .collection("photos")
                            .doc(name)["delete"]()];
                case 1:
                    _b.sent();
                    return [2 /*return*/, message.reply("Successfully deleted `" + name + "`")];
            }
        });
    });
}
exports.remove = remove;
function help(message) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, message.channel.send("**Help**\n" +
                    "- **!ping**: Return's the ping of the bot\n" +
                    "- **!add [nickname]** _With exactly one attachment, a photo_: Adds the attached photo with the nickname to the bot's database.\n" +
                    "- **!add [nickname] \"[text]\"**: Adds text to the database, so the text (in quotes) is reposted instead of an image.\n" +
                    "- **!add [nickname] [url to image]**: Adds the photo with the nickname to the bot's database.\n" +
                    "- **!post [nickname]**: posts the image stored with the given nickname.\n" +
                    "- **:[nickname]** _(no space between thr `$` and the name)_: Same as `!post [nickname]`, except it will ignore any non-existing nicknames rather than sending an error message.\n" +
                    "- **!remove [nickname]**: removes the image stored with the given nickname. Can only be called by a user with the _Manage Server_ permission.\n")];
        });
    });
}
exports.help = help;
