import { REST } from "@discordjs/rest"
import * as API from "discord-api-types/v9"
import { Client, Collection } from "discord.js"
import Log from "../util/logger.js"
import fs from "fs"
import path from "path"
import { Command } from "./Command"

class CommandManager {
  private bot: Client

  constructor(bot: Client) {
    this.bot = bot
    // load commands
  }

  public async Init() {
    if (!this.bot.commands) this.loadCommands()
    this.InitSlashCommands()
  }

  loadCommands(): void {
    const commandFiles = fs
      .readdirSync(path.join(__dirname, "..", "commands"))
      .filter((f) => f.endsWith(".js"))
    this.bot.commands = new Collection()
    this.bot.aliases = new Collection()
    for (const file of commandFiles) {
      const command = require(path.join(__dirname, "..", "commands", file))
        .default as Command
      this.bot.commands.set(command.name, command)
      command.aliases.forEach((al) => this.bot.aliases.set(al, command.name))
    }
  }

  async InitSlashCommands() {
    const rest = new REST({ version: "9" }).setToken(
      process.env.BOT_TOKEN ?? ""
    )
    try {
      const slashCmds = []
      for (const cmd of this.bot.commands) {
        slashCmds.push(cmd[1].data.toJSON())
      }
      Log.info(`Refreshing slash commands...`)
      await rest.put(API.Routes.applicationCommands(this.bot.user?.id ?? ""), {
        body: slashCmds,
      })
      Log.info(`Successfully refreshed slash commands.`)
    } catch (err: any) {
      Log.error(err.message)
      // throw err
    }
  }
}

export default CommandManager
