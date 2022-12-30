import { config } from "dotenv"
import constants from "./constants.js"
import fetch from "node-fetch"
import Log from "./util/logger.js"
config()

const { URLS } = constants

export type ResponseModel = {
	status: number
	body?: any
	error?: any
}

export const post = async (url: string, body: any): Promise<ResponseModel> => {
	try {
		Log.info(`POST --> ${url}\n${JSON.stringify(body, null, 2)}`)
		const result = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + constants.DO_TOKEN,
			},
			body: JSON.stringify(body),
		})
		Log.info(`POST <-- ${url}\n${JSON.stringify(result, null, 2)}`)
		if (result.status > 300) throw new Error("Failed!")
		const data = await result.json()
		return { status: result.status, body: data }
	} catch (err: any) {
		return { status: err.status ?? 500, error: err }
	}
}

export const _delete = async (url: string): Promise<ResponseModel> => {
	try {
		Log.info(`DELETE --> ${url}`)
		const result = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + constants.DO_TOKEN,
			},
		})
		Log.info(`result <-- ${result.status} - ${result.statusText}`)
		if (result.status > 300) throw new Error("Failed!")
		const data = await result.json()
		return { status: result.status, body: data }
	} catch (err: any) {
		return { status: err.status ?? 500, error: err }
	}
}

export const get = async (url: string): Promise<ResponseModel> => {
	try {
		Log.info(`GET --> ${url}`)
		const result = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + constants.DO_TOKEN,
			},
		})
		Log.info(`result <-- ${result.status} - ${result.statusText}`)
		if (result.status !== 200) throw new Error("Failed!")
		const data = await result.json()
		return { status: result.status, body: data }
	} catch (err: any) {
		return { status: err.status ?? 500, error: err }
	}
}

export const getAllDroplets = async () => {
	const result = await get(URLS.GET_ALL_DROPLETS)
	if (result.status !== 200)
		Log.error(`getAllDroplets: ${result.error ?? result.status}`)
	return result.body.droplets as {
		id: number
		name: string
		networks: { v4: { type: string; ip_address: string }[] }
		status: string
	}[]
}

export const createDroplet = async (snapshotId?: number) => {
	const payload = {
		name: constants.DROPLET_NAME,
		region: "fra1",
		size: "s-1vcpu-2gb",
		image: snapshotId,
		ssh_keys: constants.SSH_FINGERPRINT,
	}
	const result = await post(URLS.CREATE_DROPLET, payload)
	if (result.status > 300) throw new Error("Failed!")
	return result.body.droplet
}

export const getDroplet = async (id: number) => {
	const result = await get(URLS.GET_DROPLET(id))
	if (result.status > 300) throw new Error("Failed!")
	return result.body.droplet
}

export const shutDownDroplet = async (id: number) => {
	const result = await post(URLS.DROPLET_ACTIONS(id), { type: "shutdown" })
	if (result.status > 300) throw new Error("Failed!")
	return result.body.action
}

export const getSnapshot = async (id: number) => {
	const result = await get(URLS.GET_SNAPSHOT(id))
	if (result.status > 300) throw new Error("Failed!")
	return result.body.snapshot
}

export const createSnapshot = async (
	serverId: number,
	name = constants.SNAPSHOT_NAME
) => {
	const result = await post(URLS.DROPLET_ACTIONS(serverId), {
		type: "snapshot",
		name,
	})
	if (result.status > 300) throw new Error("Failed!")
	return result.body.action
}

export const deleteSnapshot = async (id: number) => {
	await _delete(URLS.GET_SNAPSHOT(id))
	return true
}

export const listSnapshots = async () => {
	const result = await get(URLS.SNAPSHOTS)
	if (result.status > 300) throw new Error("Failed!")
	return result.body.snapshots as { id: number; name: string }[]
}

export const deleteDroplet = async (id: number) => {
	const result = await fetch(URLS.GET_DROPLET(id), {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + constants.DO_TOKEN,
		},
	})
	if (result.status > 300) throw new Error("Failed!")
	return result
}
