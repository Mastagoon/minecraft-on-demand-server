import { CommandInteraction, Message } from "discord.js"

export interface CommandExecuteParameters {
  interaction?: CommandInteraction
  message?: Message
  args?: string[]
  type: "interaction" | "message"
}

export interface CommandArg {
  name: string
  description: string
  isRequired: boolean
}

