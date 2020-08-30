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
 * Returns a random property or value from an object passed to it
 * @param {object} obj - The object whose properties will be selected from
 * @param {boolean} shouldReturnValue - If true, return the random properties value
 */
export const genRandProperty = (obj, shouldReturnValue) => {
  const objProperties = Object.keys(obj)
  const randomProperty =
    objProperties[genRand(0, objProperties.length - 1, true)]
  return shouldReturnValue ? obj[randomProperty] : randomProperty
}

/**
 * Returns a computed property or value from an object passed to it, based on string length
 * @param {string} str - The string whose length will compute the key
 * @param {object} obj - The object whose properties will be selected from
 * @param {boolean} shouldReturnValue - If true, return the random properties value
 */
export const genComputedProperty = (str, obj, shouldReturnValue) => {
  const objProperties = Object.keys(obj)
  const computedProperty = objProperties[str.length % objProperties.length]
  return shouldReturnValue ? obj[computedProperty] : computedProperty
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
