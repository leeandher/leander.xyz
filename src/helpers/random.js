export const genRand = (min = 0, max = 1, isInt = false) => {
  const randomNum = Math.random() * (max - min) + min
  return isInt ? Math.round(randomNum) : randomNum
}
