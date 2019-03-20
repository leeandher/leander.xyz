export const getCopyrightYearsFrom = startYear => {
  const thisYear = new Date().getFullYear()
  return thisYear === startYear ? `${thisYear}` : `${startYear} - ${thisYear}`
}

export default getCopyrightYearsFrom
