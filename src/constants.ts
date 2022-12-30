import Log from "./util/logger"

let constants = {
	DO_TOKEN: "",
	SSH_FINGERPRINT: [""],
	SNAPSHOT_NAME: "",
	SERVER_NAME: "",
	DROPLET_NAME: "",
	URLS: {
		GET_ALL_DROPLETS: "https://api.digitalocean.com/v2/droplets",
		CREATE_DROPLET: "https://api.digitalocean.com/v2/droplets",
		GET_DROPLET: (id: number) =>
			`https://api.digitalocean.com/v2/droplets/${id}`,
		DROPLET_ACTIONS: (id: number) =>
			`https://api.digitalocean.com/v2/droplets/${id}/actions`,
		SNAPSHOTS: "https://api.digitalocean.com/v2/snapshots",
		GET_SNAPSHOT: (id: number) =>
			`https://api.digitalocean.com/v2/snapshots/${id}`,
	},
}

export const intializeConstants = () => {
	const DO_TOKEN = process.env.DO_TOKEN
	const SSH_FINGERPRINT = process.env.SSH_FINGERPRINT
	const SNAPSHOT_NAME = process.env.SNAPSHOT_NAME
	const SERVER_NAME = process.env.SERVER_NAME
	const DROPLET_NAME = process.env.DROPLET_NAME
	if (!DO_TOKEN || !SSH_FINGERPRINT || !SNAPSHOT_NAME || !SERVER_NAME || !DROPLET_NAME) {
		Log.error("Missing environment variables!")
		process.exit(1)
	}
	constants.DO_TOKEN = DO_TOKEN
	constants.SSH_FINGERPRINT = SSH_FINGERPRINT.split(",")
	constants.SNAPSHOT_NAME = SNAPSHOT_NAME
	constants.SERVER_NAME = SERVER_NAME
	constants.DROPLET_NAME = DROPLET_NAME
}

export default constants
