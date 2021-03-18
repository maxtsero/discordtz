/**
 * Copyright (c) Max Tsero. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Rounds a given number to the specified precision.
 * @param {number} value - The number to round.
 * @param {number} precision - The number of decimal places to round it to.
 * @returns {number} - The rounded number.
 */
function round (value, precision) {
  var multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}
/**
 * Checks if a number falls within a given range.
 * @param {number} num - The number to test.
 * @param {number} min - The lower-bound of the range.
 * @param {number} max - The upper-bound of the range.
 * @return {boolean} - True or false depending on the input and range.
 */
function between (num, min, max) {
  return num >= min && num <= max
}
/**
 * Checks if the different between two timestamps is greater or less than a number.
 * @param {timestamp} time1 - The first timestamp.
 * @param {timestamp} time2 - The second timestamp.
 * @param {number} difference - The target difference.
 * @param {string} mode - The mode e.g '>'.
 * @return {boolean} - True or false depending on input values.
 */
function timeDifference (time1, time2, difference, mode) {
  const diffMilliseconds = (time1 - time2)
  console.log('DiffMs', diffMilliseconds)
  const diffMins = Math.floor((diffMilliseconds / 1000) / 60)
  console.log('DiffMins', diffMins)
  switch (mode) {
    case '>=':
      if (diffMins >= difference) {
        return true
      }
      break
    case '<=':
      if (diffMins <= difference) {
        return true
      }
      break
    case '>':
      if (diffMins > difference) {
        return true
      }
      break
    case '<':
      if (diffMins < difference) {
        return true
      }
      break
    default:
      return false
  }
}

exports.round = round
exports.between = between
exports.timeDifference = timeDifference
