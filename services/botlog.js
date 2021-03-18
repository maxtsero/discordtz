/**
 * Copyright (c) Max Tsero. All rights reserved.
 * Licensed under the MIT License.
 */
const env = require('env-var')
const logChannelId = env.get('LOG_CHANNEL').asString()
class BotLog {
  constructor (discordClient) {
    this.discordClient = discordClient
  }

  async setup () {
    this.logChannel = await this.discordClient.channels.fetch(logChannelId)
  }

  error (message) {
    const output = `**ERROR:** ${message}`
    return output
  }

  warning (message) {
    const output = `**WARNING:** ${message}`
    return output
  }

  notice (message) {
    const output = `**NOTICE:** ${message}`
    return output
  }

  async send (message) {
    await this.setup()
    await this.logChannel.send(message)
  }
}
exports.BotLog = BotLog
