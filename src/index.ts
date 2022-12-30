import { config } from "dotenv"
import Log from "./util/logger.js"
import Discord, { Collection } from "discord.js"
import { Command } from "./lib/Command.js"
import CommandManager from "./lib/commandManager.js"
declare module "discord.js" {
	export interface Client {
		commands: Collection<string, Command>
		aliases: Collection<string, string>
	}
}
config()

const bot = new Discord.Client({
	intents: [
		"GUILD_MESSAGES",
		"GUILDS",
		"GUILD_MEMBERS",
		"GUILD_INVITES",
		"GUILD_PRESENCES",
	],
})

bot.on("ready", async () => {
	Log.info(`Logged in as ${bot.user?.username}`)
	const commandManager = new CommandManager(bot)
	await commandManager.Init()
})

bot.on("messageCreate", (msg) => {
	if (!msg.content.startsWith("!")) return
	const args = msg.content.slice(1).split(/ +/)
	const commandName = args.shift()
	const command = bot.commands.get(
		// lol
		bot.aliases.get(commandName ?? "") ?? commandName ?? ""
	)
	if (!command) return
	try {
		command.execute({ message: msg, args, type: "message" })
	} catch (err: any) {
		Log.error(`messageCreateEvent: ${err.message}`)
		msg.reply({ content: "There was an error while executing this command!" })
	}
})

bot.login(process.env.BOT_TOKEN)
