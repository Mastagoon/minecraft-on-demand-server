import "colorts/lib/string.js"

export default class Log {
  static debug = (message: string) => console.log(`[Debug]: `.cyan + message)
  static error = (message: string) =>
    console.log(`[Error]: `.red + `${message}`)
  static info = (message: string) => console.log(`[Info]: ${message}`)
  static warning = (message: string) =>
    console.log(`[Warning]: `.yellow + message)
}
