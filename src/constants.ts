export default {
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
  XML_UPLOAD_URL: "https://dumb-file-server-production.up.railway.app/upload",
}
