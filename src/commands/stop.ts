import { destroyServer, isServerUp } from "../actions.js"
import { setCommandInProgress } from "../index.js"
import { Command } from "../lib/Command.js"
import { CommandArg, CommandExecuteParameters } from "../types.js"

const options: CommandArg[] = []


const stop = async (options: CommandExecuteParameters) => {
	const { type, message, interaction } = options
	const isSlash = type === "interaction"
	setCommandInProgress(true)
	console.log("Killing server...")
	// is there a server?
	const up = await isServerUp()
	if (!up) {
		setCommandInProgress(false)
		return isSlash ? interaction?.reply(`لا يوجد سيرفر`) : message?.reply(`لا يوجد سيرفر`)
	}
	// kill server
	isSlash ? interaction?.reply(`يتم ايقاف السيرفر`) : message?.reply(`يتم ايقاف السيرفر`)
	await destroyServer()
	isSlash ? interaction?.reply(`تم ايقاف السيرفر`) : message?.reply(`تم ايقاف السيرفر`)
	setCommandInProgress(false)
}
export default new Command(
	"stop",
	"Stops the minecraft server",
	[],
	stop,
	options
)
