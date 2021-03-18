/**
 * Copyright (c) Max Tsero. All rights reserved.
 * Licensed under the MIT License.
 */
const io = require('@pm2/io')
const { Guild } = require('../data/schema/discord')
module.exports = {
  name: 'ready',
  listen (client) {
    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`)
    const channelMonitor = io.metric({
      name: 'Discord Channels',
      id: 'ra/realtime/channels'
    })
    channelMonitor.set(client.channels.cache.size)
    const usersMonitor = io.metric({
      name: 'Discord Users',
      id: 'ra/realtime/users'
    })
    usersMonitor.set(client.users.cache.size)
    client.user.setPresence({
      status: 'online'
    })
    if (client.guilds.cache.size >= 1) {
      client.guilds.cache.forEach(guild => {
        const guildID = guild.id
        const guildQuery = { guildId: guildID }
        Guild.findOneAndUpdate(guildQuery, { guildId: guild.id, name: guild.name }, { upsert: true, new: true }, function (error, document) {
          if (error) throw error
        })
      })
    }
  }
}
