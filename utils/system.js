/**
 * Copyright (c) Max Tsero. All rights reserved.
 * Licensed under the MIT License.
 */
const _ = require('underscore')
const env = require('env-var')
const commands = env.get('COMMANDS').asJsonArray()
const Discord = require('discord.js')

/**
 * Checks if the specified command exists in the commands config array.
 * @param {string} commandName - The command name.
 * @return {boolean} - True or false depending on the input config value.
 */
function checkCommand (commandName) {
  if (_.isEmpty(commands)) {
    return false
  } else {
    if (_.includes(commands, commandName)) {
      return true
    } else {
      return false
    }
  }
}
/**
 * Checks if an active cooldown entry exists for the user and command.
 * @param {object} command
 * @param {object} message
 * @return {object} - An object containing a status and or message in response to the check.
 */
async function checkCooldown (command, message) {
  var cooldowns = global.cooldowns
  let reply
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection())
    console.log('Cooldown Set:', cooldowns)
  }

  var now = Date.now()
  var timestamps = cooldowns.get(command.name)
  console.log('Timestamps:', timestamps)
  var cooldownAmount = (command.cooldown || 3) * 1000

  if (timestamps.has(message.author.id)) {
    var expirationTime = timestamps.get(message.author.id) + cooldownAmount

    if (now < expirationTime) {
      console.log('Cooldown Triggered')
      var timeLeft = (expirationTime - now) / 1000
      reply = {
        msg: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      }
      return reply
    }
  } else {
    console.log('No Cooldown')
    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
    reply = {
      status: 'no-cooldown'
    }
    return reply
  }
}

exports.checkCommand = checkCommand
exports.checkCooldown = checkCooldown
