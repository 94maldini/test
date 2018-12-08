const {
	prefix,
	token
} = require("./config");
const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");


bot.on("ready", async () => {
	console.log('Bot Start!'); // untuk memberitahu bahwa bot sudah siap
	bot.user.setActivity("Bot TEST");
});

// Pesan selamat datang member baru
bot.on('guildMemberAdd', member => {
	// Send the message to a designated channel on a server:
	const channel = member.guild.channels.find(ch => ch.name === 'member-log');
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	// Send the message, mentioning the member
	channel.send(`${member} Join server.`);
});
// Pesan member yg keluar
bot.on('guildMemberRemove', (member) => {
	const channel = member.guild.channels.find(ch => ch.name === 'member-log');
	if (!channel) return;
	channel.send(`${member} Keluar dari server.`);
});

bot.on("message", async (message) => {
	if (message.content === `${prefix}test`) {
		message.channel.send(`Bot sudah terhubung ${message.author.username}`);
	} else if (message.content === `${prefix}ping`) {
		message.channel.send(`pong ${message.author.username}`);
	} else if (message.content === `${prefix}server`) {
		message.channel.send(`Bot tehubung ke server: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	} else if (message.content === `${prefix}user`) {
		message.channel.send(`Username: ${message.author.username}\nID: ${message.author.id}`);
	}
});


// kick member
bot.on('message', message => {
	// Ignore messages that aren't from a guild
	if (!message.guild) return;

	// If the message content starts with "!kick"
	if (message.content.startsWith(`${prefix}kick`)) {
		// Assuming we mention someone in the message, this will return the user
		// Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
		const user = message.mentions.users.first();
		// If we have a user mentioned
		if (user) {
			// Now we get the member from the user
			const member = message.guild.member(user);
			// If the member is in the guild
			if (member) {
				/**
				 * Kick the member
				 * Make sure you run this on a member, not a user!
				 * There are big differences between a user and a member
				 */
				member.kick('Optional reason that will display in the audit logs').then(() => {
					// We let the message author know we were able to kick the person
					message.reply(`Successfully kicked ${user.tag}`);
				}).catch(err => {
					// An error happened
					// This is generally due to the bot not being able to kick the member,
					// either due to missing permissions or role hierarchy
					message.reply('I was unable to kick the member');
					// Log the error
					console.error(err);
				});
			} else {
				// The mentioned user isn't in this guild
				message.reply('That user isn\'t in this guild!');
			}
			// Otherwise, if no user was mentioned
		} else {
			message.reply('You didn\'t mention the user to kick!');
		}
	}
});


// Ban member
bot.on('message', message => {
	// Ignore messages that aren't from a guild
	if (!message.guild) return;

	// if the message content starts with "!ban"
	if (message.content.startsWith(`${prefix}ban`)) {
		// Assuming we mention someone in the message, this will return the user
		// Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
		const user = message.mentions.users.first();
		// If we have a user mentioned
		if (user) {
			// Now we get the member from the user
			const member = message.guild.member(user);
			// If the member is in the guild
			if (member) {
				/**
				 * Ban the member
				 * Make sure you run this on a member, not a user!
				 * There are big differences between a user and a member
				 * Read more about what ban options there are over at
				 * https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban
				 */
				member.ban({
					reason: 'They were bad!',
				}).then(() => {
					// We let the message author know we were able to ban the person
					message.reply(`Berhasil banned ${user.tag}`);
				}).catch(err => {
					// An error happened
					// This is generally due to the bot not being able to ban the member,
					// either due to missing permissions or role hierarchy
					message.reply('I was unable to ban the member');
					// Log the error
					console.error(err);
				});
			} else {
				// The mentioned user isn't in this guild
				message.reply('That user isn\'t in this guild!');
			}
		} else {
			// Otherwise, if no user was mentioned
			message.reply('Kamu mau ban siapa ? @NamaYgAkanDiBan!');
		}
	}
});


bot.login(token);