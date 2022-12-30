import { get } from "../api"
import Log from "./logger"

export const getPlayerCount = async (ip: string) => {
  try {
    const result = await get(`http://${ip}:8080/players`)
    return result.body ?? 0
  } catch (err: any) {
    Log.error(`Error getting player count`)
    console.log(err)
    return 0
  }
}
