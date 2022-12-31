import { isServerUp, spawnNewServer } from "../actions.js"
import { setCommandInProgress } from "../index.js"
import { Command } from "../lib/Command.js"
import { CommandArg, CommandExecuteParameters } from "../types.js"

const options: CommandArg[] = []

let pause = false

const start = async (options: CommandExecuteParameters) => {
	const { type, message, interaction } = options
	const isSlash = type === "interaction"
	if (pause)
		return isSlash
			? interaction?.reply(`يرجى الانتظار قبل استعمال هذا الامر من جديد`)
			: message?.reply(`يرجى الانتظار قبل استعمال هذا الأمر من جديد`)
	setCommandInProgress(true)
	console.log("Starting server...")
	// is there a server?
	const up = await isServerUp()
	if (up) {
		setCommandInProgress(false)
		return isSlash
			? interaction?.reply(
				`السيرفر يعمل حالياً على الآي بي: ${up.networks.v4.find((n) => n.type === "public")?.ip_address
				}`
			)
			: message?.reply(
				`السيرفر يعمل حالياً على الآي بي: ${up.networks.v4.find((n) => n.type === "public")?.ip_address
				}`
			)
	}
	// no server is up
	// reply to the user then run the spawn command
	const response = `جاري تشغيل السيرفر...\nقد تأخذ هذه العملية عدّة دقائق`
	isSlash ? interaction?.reply(response) : message?.reply(response)
	// spawn the server
	const spawn = await spawnNewServer()
	isSlash ? interaction?.reply(`تم تشغيل السيرفر, يرجى لانتظار لـ 5 دقائئق قبل محاولة الإتصال`) : message?.reply(`تم تشغيل السيرفر, يرجى لانتظار لـ 5 دقائئق قبل محاولة الإتصال`)
	setCommandInProgress(false)
	if (spawn) {
		return isSlash
			? interaction?.reply(`السيرفر يعمل حالياً على الآي بي: ${spawn}`)
			: message?.reply(`السيرفر يعمل حالياً على الآي بي: ${spawn}`)
	}
}
export default new Command(
	"start",
	"Start a new server",
	["new", "run"],
	start,
	options
)
