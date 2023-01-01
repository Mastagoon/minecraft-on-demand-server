import Log from "./util/logger"

let constants = {
	DO_TOKEN: "",
	SSH_FINGERPRINT: [""],
	SNAPSHOT_NAME: "",
	DROPLET_NAME: "",
	DROPLET_REGION: "",
	DROPLET_SIZE: "",
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
	const DROPLET_NAME = process.env.DROPLET_NAME
	const DROPLET_REGION = process.env.DROPLET_REGION
	const DROPLET_SIZE = process.env.DROPLET_SIZE
	let mes = ""
	if (!DO_TOKEN) mes += "DO_TOKEN "
	if (!SSH_FINGERPRINT) mes += "SSH_FINGERPRINT "
	if (!SNAPSHOT_NAME) mes += "SNAPSHOT_NAME "
	if (!DROPLET_NAME) mes += "DROPLET_NAME "
	if (!DROPLET_REGION) mes += "DROPLET_REGION "
	if (!DROPLET_SIZE) mes += "DROPLET_SIZE "
	if (mes.length > 0) {
		Log.error("Missing environment variables! The program will now exit\n Missing variables: " + mes)
		process.exit(1)
	}
	constants.DO_TOKEN = DO_TOKEN!
	constants.SSH_FINGERPRINT = SSH_FINGERPRINT!.split(",")
	constants.SNAPSHOT_NAME = SNAPSHOT_NAME!
	constants.DROPLET_NAME = DROPLET_NAME!
}

export default constants
