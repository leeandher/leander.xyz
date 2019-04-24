import { css } from "styled-components"

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576,
}

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `
  return acc
}, {})

/**
 * Quickly apply theme item through styled-components
 * @param {string} paletteBase - The first level property on the styled-component theme
 * @param {string} [paletteKey] - The second level property on the base of the styled-component theme
 */
export const themer = (paletteBase, paletteKey) => {
  return function({ theme }) {
    return paletteKey ? theme[paletteBase][paletteKey] : theme[paletteBase]
  }
}
