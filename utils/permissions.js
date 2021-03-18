/**
 * Copyright (c) Max Tsero. All rights reserved.
 * Licensed under the MIT License.
 */
const _ = require('underscore')
const env = require('env-var')
const administrators = env.get('ADMINISTRATORS').asJsonArray()
const banned = env.get('BANNED').asJsonArray()
const adminrole = env.get('ADMIN_ROLE').asString()
const diplorole = env.get('DIPLO_ROLE').asString()
const modrole = env.get('MOD_ROLE').asString()
const adminchannels = env.get('ADMIN_CHANNELS').asJsonArray()
const modchannels = env.get('MOD_CHANNELS').asJsonArray()
const roleschannels = env.get('ROLE_CHANNELS').asJsonArray()
/**
 * Checks if the specified user ID exists in the administrators config array.
 * @param {number} id - The user's Discord ID.
 * @return {boolean} - True or false depending on the input ID and config value.
 */
async function checkAdministrator (member) {
  if (member) {
    const adminRole = await checkAdminRole(member)
    if (checkAdminConfig(member)) {
      return true
    } else if (adminRole) {
      return true
    } else {
      return false
    }
  }
}
/**
 * Checks if the specified user ID exists in the administrators config array.
 * @param {number} id - The user's Discord ID.
 * @return {boolean} - True or false depending on the input ID and config value.
 */
function checkAdminConfig (member) {
  if (_.isEmpty(administrators)) {
    return false
  } else {
    if (_.includes(administrators, member.id)) {
      return true
    } else {
      return false
    }
  }
}
/**
 * Checks if the specified user ID exists in the banned config array.
 * @param {number} id - The user's Discord ID.
 * @return {boolean} - True or false depending on the input ID and config value.
 */
function checkBanned (id) {
  if (_.isEmpty(banned)) {
    return false
  } else {
    if (_.includes(banned, id)) {
      return true
    } else {
      return false
    }
  }
}

/**
 * Checks if the specified member object has the designated admin role.
 * @param {object} member - The user's Discord ID.
 * @return {boolean} - True or false depending on the input ID and config value.
 */
async function checkAdminRole (member) {
  if (_.isEmpty(adminrole)) {
    console.error('Could not find admin role.')
    return false
  } else {
    const roleCheck = await member.roles.cache.find(role => role.id === adminrole)
    if (roleCheck) {
      return true
    } else {
      return false
    }
  }
}
/**
 * Checks if the specified member object has the designated admin role.
 * @param {object} member - The user's Discord ID.
 * @return {boolean} - True or false depending on the input ID and config value.
 */
async function checkModRole (member) {
  if (_.isEmpty(modrole)) {
    console.error('Could not find mod role.')
    return false
  } else {
    const roleCheck = await member.roles.cache.find(role => role.id === modrole)
    if (roleCheck) {
      return true
    } else {
      return false
    }
  }
}
/**
 * Checks if the specified member object has the designated diplo role.
 * @param {object} member - The user's Discord ID.
 * @return {boolean} - True or false depending on the input ID and config value.
 */
async function checkDiploRole (member) {
  if (_.isEmpty(diplorole)) {
    console.error('Could not find mod role.')
    return false
  } else {
    const roleCheck = await member.roles.cache.find(role => role.id === diplorole)
    if (roleCheck) {
      return true
    } else {
      return false
    }
  }
}
/**
 * Checks if the channel is one of the designated admin channels.
 * @param {number} id - The channel ID.
 * @return {boolean} - True or false depending on the input ID and config value.
 */
function checkAdminChannel (id) {
  if (_.isEmpty(adminchannels)) {
    return false
  } else {
    if (_.includes(adminchannels, id)) {
      return true
    } else {
      return false
    }
  }
}
/**
 * Checks if the channel is one of the designated mod channels.
 * @param {number} id - The channel ID.
 * @return {boolean} - True or false depending on the input ID and config value.
 */
function checkModChannel (id) {
  if (_.isEmpty(modchannels)) {
    return false
  } else {
    if (_.includes(modchannels, id)) {
      return true
    } else {
      return false
    }
  }
}
/**
 * Checks if the channel is one of the designated roles channels.
 * @param {number} id - The channel ID.
 * @return {boolean} - True or false depending on the input ID and config value.
 */
function checkRolesChannel (id) {
  if (_.isEmpty(roleschannels)) {
    return false
  } else {
    if (_.includes(roleschannels, id)) {
      return true
    } else {
      return false
    }
  }
}

exports.checkAdministrator = checkAdministrator
exports.checkBanned = checkBanned
exports.checkAdminRole = checkAdminRole
exports.checkDiploRole = checkDiploRole
exports.checkModRole = checkModRole
exports.checkAdminChannel = checkAdminChannel
exports.checkModChannel = checkModChannel
exports.checkRolesChannel = checkRolesChannel
