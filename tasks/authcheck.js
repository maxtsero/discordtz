/**
 * Copyright (c) Max Tsero. All rights reserved.
 * Licensed under the MIT License.
 */
const auth = require('../utils/auth')
module.exports = {
  name: 'authcheck',
  interval: 300,
  /**
   * Provides a simple reply to confirm operation.
   * @return {null}
   */
  async run (client, guild) {
    const logMessageStarting = client.logger.notice('Starting AuthCheck run.')
    await client.logger.send(logMessageStarting)
  }
}
