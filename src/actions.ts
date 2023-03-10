import {
	createDroplet,
	createSnapshot,
	deleteDroplet,
	deleteSnapshot,
	getAllDroplets,
	getDroplet,
	listSnapshots,
	shutDownDroplet,
} from "./api"
import constants from "./constants"
import Log from "./util/logger"

export const isServerUp = async (): Promise<
	| {
		id: number
		name: string
		networks: { v4: { type: string; ip_address: string }[] }
		status: string
	}
	| false
> => {
	const droplets = await getAllDroplets()
	if (!droplets) return false
	const name = constants.DROPLET_NAME
	const server = droplets.find((droplet) => droplet.name.startsWith(name))
	const serverStatus = server ? server.status : "down"
	Log.debug(`Server status: ${serverStatus}`)
	if (server && server.status === "active") return server
	return false
}

export const spawnNewServer = async (): Promise<string | undefined> => {
	// check if server is already up
	// if not, create a new one
	if (await isServerUp()) return
	// create a new server
	// 1- find snapshot
	const snapshots = await listSnapshots()
	const snapshotId = snapshots.find(
		(snapshot) => snapshot.name === constants.SNAPSHOT_NAME
	)?.id
	// 2- create droplet
	let droplet = await createDroplet(snapshotId)
	const id = droplet.id
	// wait for the droplet to be instantiated
	while (true) {
		Log.debug("Creating server...")
		droplet = await getDroplet(id)
		if (droplet.status === "active") break
		// sleep for 20 seconds
		await new Promise((resolve) => setTimeout(resolve, 20000))
	}
	const ip = droplet.networks.v4.find((n: any) => n.type === "public")
		?.ip_address as string
	Log.debug("Server up at " + ip)
	return ip
}

export const destroyServer = async () => {
	const server = await isServerUp()
	if (!server) return Log.error("No server to destroy")
	Log.debug("Shutting down server...")
	// shut down the server
	const result = await shutDownDroplet(server.id)
	if (!result) return Log.error("Failed to shut down server")
	Log.debug("Server shut down successfully")
	// take snapshot of the server
	await updateSnapshot(server.id)
	// try to destroy the droplet
	await deleteDroplet(server.id)
	Log.debug("Server destroyed.")
}

export const updateSnapshot = async (id: number) => {
	// create a new snapshot
	const list = await listSnapshots()
	const oldSnapshot = list.find(
		(snapshot) => snapshot.name === constants.SNAPSHOT_NAME
	)
	await createSnapshot(id)
	// wait for the snapshot to be created
	while (true) {
		Log.debug("Creating snapshot...")
		const snapshots = await listSnapshots()
		if (snapshots.length > list.length) {
			// when the snapshot creation is completed, delete the old snapshot
			if (oldSnapshot) await deleteSnapshot(oldSnapshot.id)
			break
		}
		// sleep for 120 seconds
		await new Promise((resolve) => setTimeout(resolve, 120000))
	}
}
