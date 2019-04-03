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
