/**
 * Copyright (c) Max Tsero. All rights reserved.
 * Licensed under the MIT License.
 */
const Math = require('../utils/math')
module.exports = {
  name: 'ping',
  description: 'Asks the bot to return a confirmation that it\'s online along with it\'s message and API latency figures.',
  usage: '',
  cooldown: 10,
  /**
   * Provides a simple reply to confirm operation.
   * @param {object} client - An object containing the Discord client information.
   * @param {object} message - An object containing the message the bot is reponding to.
   * @return {null}
   */
  async run (client, message) {
    const msg = await message.channel.send('Ping?')
    msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
  }
}
