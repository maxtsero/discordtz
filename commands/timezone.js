/**
 * Copyright (c) Max Tsero. All rights reserved.
 * Licensed under the MIT License.
 */
const env = require('env-var')
const eutzRole = env.get('EUTZ_ROLE').asString()
const ustzRole = env.get('USTZ_ROLE').asString()
const autzRole = env.get('AUTZ_ROLE').asString()
const rutzRole = env.get('RUTZ_ROLE').asString()
const industryRole = env.get('INDY_ROLE').asString()
const db = require('../utils/db')
const perms = require('../utils/permissions')
module.exports = {
  name: 'timezone',
  aliases: ['tz', 'zone', 'role'],
  description: 'Assigns a role to a member.',
  usage: 'USTZ',
  cooldown: 5,
  /**
   * Allows a user to take a role.
   * @param {object} client - An object containing the Discord client information.
   * @param {object} message - An object containing the message the bot is reponding to.
   * @param {array} args - An array containing the parsed arguments for the command.
   * @return {null}
   */
  async run (client, message, args) {
    const memberName = message.member.nickname
    const memberId = message.member.id
    const guildId = message.guild.id
    const guild = await db.findById('Guild', guildId)
    const memberQuery = { memberId: memberId }
    if (!perms.checkRolesChannel(message.channel.id)) {
      await message.author.send('Sorry, this command is only valid in certain channels.')
      await message.delete({timeout: 1000 })
      return
    }
    if (typeof args[0] === 'undefined' || !checkValidRole(args[0])) {
      const reply = await message.channel.send('You need to specify a valid timezone (one of USTZ, EUTZ or AUTZ) or role (currently only IND).')
      await reply.delete({timeout: 2000 })
      await message.delete({timeout: 1000 })
    } else if (typeof args[1] !== 'undefined') {
      const reply = await message.channel.send('This command only accepts single parameter')
      await reply.delete({timeout: 2000 })
      await message.delete({timeout: 1000 })
    }
    const roleId = getRole(args[0])
    const memberData = {
      memberId: memberId,
      name: memberName,
      guild: guild._id,
      $addToSet: {
        timezones: args[0]
      }
    }
    const dbMember = await db.findOneAndUpdate('Member', memberQuery, memberData)
    guild.members.addToSet(dbMember._id)
    guild.save()
    if (message.guild.roles.cache.get(roleId)) {
      const role = message.guild.roles.cache.get(roleId)
      await message.guild.members.cache.get(dbMember.memberId).roles.add(role, 'Self assigned via AuthBot')
      await message.author.send(`You've self-assigned the ${role.name} role`)
      await message.delete({ timeout: 2000 }, 'Cleaning up')
    }
  }
}

/**
 * Checks that the given timezone is an accepted value.
 * @param {object} string - The role string/name as given by the user.
 * @return {boolean} - A true/false value depending on whether the input is acceptable.
 */
function checkValidRole (role) {
  role = role.toLowerCase()
  switch (role) {
    case 'eutz':
      return true
    case 'ustz':
      return true
    case 'autz':
      return true
    case 'rutz':
      return true
    case 'ind':
    case 'industrialist':
      return true
    default:
      return false
  }
}

/**
 * Returns the matching role ID for a zone name.
 * @param {object} string - The role string/name as given by the user.
 * @return {string} - A string containing the role ID for the chosen timezone.
 */
function getRole (zone) {
  zone = zone.toLowerCase()
  switch (zone) {
    case 'eutz':
      return eutzRole
    case 'ustz':
      return ustzRole
    case 'autz':
      return autzRole
    case 'rutz':
      return rutzRole
    case 'ind':
    case 'industrialist':
      return industryRole
    default:
      return null
  }
}
