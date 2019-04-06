/**
 * Generates footer copyright year range
 * @param {number} startYear - The year beginning the copyright period.
 */
export const getCopyrightYearsFrom = startYear => {
  const thisYear = new Date().getFullYear()
  return thisYear === startYear ? `${thisYear}` : `${startYear} - ${thisYear}`
}

/**
 * Generates a random number based on the specified parameters
 * @param {number} min - The minimum random number (default: 0)
 * @param {number} max - The maximum random number (default: 1)
 * @param {boolean} isInt - If true, random number will be rounded to an integer (default: false)
 */
export const genRand = (min = 0, max = 1, isInt = false) => {
  const randomNum = Math.random() * (max - min) + min
  return isInt ? Math.round(randomNum) : randomNum
}

/**
 * Returns a URI of encoded data
 * @param {object} data - object of data to URI encode
 */
export const encode = data => {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}-${encodeURIComponent(data[key])}`)
    .join("&")
}
