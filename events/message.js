/**
 * Copyright (c) Max Tsero. All rights reserved.
 * Licensed under the MIT License.
 */
const Discord = require('discord.js')
const env = require('env-var')
const parser = require('discord-command-parser')
const _ = require('underscore')

const prefix = env.get('PREFIX').asString()
const banned = env.get('BANNED').asJsonArray()

module.exports = {
  name: 'message',
  listen (client, message) {
    let args
    const id = message.author.id
    const tag = message.author.tag
    // Ignore all bots
    if (message.author.bot) return
    if (_.includes(banned, id)) {
      const logMessage = client.logger.error(`Banned user ${tag} (${id}) tried to use the bot.`)
      client.logger.send(logMessage)
      return
    }
    // Ignore messages not starting with the prefix.
    if (!message.content.startsWith(prefix) || message.author.bot) return
    const parsed = parser.parse(message, prefix)
    if (!parsed.success) return
    // Our standard argument/command name definition.
    const commandName = parsed.command
    // We need to handle arguments differently for the "Role Assign" command.
    if (commandName === 'roleassign' || commandName === 'roleass' || commandName === 'ass' || commandName === 'ra') {
      args = parsed.body
    } else {
      args = parsed.arguments
    }
    // Grab the command data from the client.commands collection.
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    // If that command doesn't exist, silently exit and do nothing
    if (!command) return
    // Run the command
    const cooldownResult = cooldownCheck(command, message)
    if (typeof cooldownResult !== 'string') {
      command.run(client, message, args)
    } else {
      message.reply(cooldownResult)
    }
  }
}

async function cooldownCheck (command, message) {
  const cooldowns = global.cooldowns
  let reply
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection())
  }

  const now = Date.now()
  const timestamps = cooldowns.get(command.name)
  const cooldownAmount = (command.cooldown || 3) * 1000

  if (!timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000
      reply = {
        msg: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      }
      return reply
    }
  } else {
    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
    reply = {
      status: 'no-cooldown'
    }
    return reply
  }
}
