# Minecraft on-demand discord Bot

A simple discord bot that creates and deletes a minecraft server using digital ocean's API.

# Motivation
While hosting a private minecraft server, I realized that me and my friends play on it for - at most - 5 hours per day. And sometimes we would spend several days without logging in. This projects spins up and tears down the server on a digital ocean droplet using a discord bot command.

Server costs without this bot: ```24$ per month (fixed)```<br>
Server costs with the bot: ```(0.0004$/hr for snapshot storage) + (~0.036$/hr server cost) = 0.288$(fixed) + 5.4$(avg 5hrs everyday) = 5.688$/month```<br>

Note: This calculation is based on Digital Ocean's s-2vcpu-4gb droplet, and doesn't factor in the cost of spinning up a new droplet or creating a new snapshot (which typically costs 0.01$)

# How it works
This project uses the [Digital Ocean API](https://docs.digitalocean.com/reference/api/api-reference/) to create and delete droplets.
You can also use it to backup and restore the server state. In this project, we use Discord.js to create a discord bot with commands to start, backup and then delete a droplet.

# Getting started
To get started, first copy the .example.env file to .env and provide your env variables
```
DO_TOKEN=YOUR_DIGITAL_OCEAN_API_TOKEN
SSH_FINGERPRINT=id1,id2,id3..
BOT_TOKEN=DISCORD_BOT_TOKEN
SNAPSHOT_NAME=A_NAME_FOR_THE_SAVED_SNAPSHOT
DROPLET_NAME=A_NAME_FOR_THE_DROPLET
DROPLET_REGION=fra1
DROPLET_SIZE=s-2vcpu-2gb
```

`DROPLET_NAME` is the name given to the droplet when it is created or deleted. `SNAPSHOT_NAME` is the name of the snapshot that will be used to create the droplet. and `ssh_keys` is a comma-separated list of ssh_keys that can access the droplet. Note that this refers to the dogital ocean fingerprint of the ssh keys, not the keys themselves, the fingerprints should look smoething like this: `3b:16:bf:e4:8b:00:8b:b8:59:8c:a9:d3:f0:19:45:fa`

# Usage

```
npm install
npm run build
npm run dev
```

or yarn:
```
yarn
yarn build
yarn dev
```
