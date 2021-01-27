# Discord Photos Bot
**Invite Link**: https://discord.com/api/oauth2/authorize?client_id=803472047090696244&permissions=317504&scope=bot

Allows users to add photos, and then repost them quickly later by refrencing them with a nickname.

##### Caveats

1. Photos aren't actually stored on the bot, only the link to the photo (for now), so if the original photo is deleted (for example, if you upload an image to discord and then later delete it) reposts won't work anymore.
2. Photos are uploaded per server

#### Commands

- **!ping**: Return's the ping of the bot
- **!add [nickname]** _With exactly one attachment, a photo_: Adds the attached photo with the nickname to the bot's database.
- **!add [nickname] [url to image]**: Adds the photo with the nickname to the bot's database.
- **!post [nickname]**: posts the image stored with the given nickname.
- **$[nickname]** _(no space between the `:` and the name)_: Same as `!post [nickname]`, except it will ignore any non-existing nicknames rather than sending an error message.
- **!remove [nickname]**: removes the image stored with the given nickname. Can only be called by a user with the _Manage Server_ permission.
