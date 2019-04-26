import { css } from "styled-components"
import * as _ from "lodash"

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
 * @param {*} paletteKey - A traversal path to the paletteStyle (see https://lodash.com/docs/4.17.11#get)
 * @returns {} - A style property value from the palette file
 */
export const themer = paletteKey => {
  return function({ theme }) {
    return _.get(theme, paletteKey)
  }
}
