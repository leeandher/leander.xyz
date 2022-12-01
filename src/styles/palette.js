export const palette = {
  constants: {
    navBarHeight: "67px",
  },
  color: {
    red: "#ef4d5d",
    orange: "#ffb249",
    yellow: "#ffdc60",
    green: "#5eed69",
    teal: "#4DCCB0",
    blue: "#0fa7ff",
    purple: "#e591ff",
    pink: "#ff79a7",
  },
  opacity: {
    faded: "0.65",
  },
  shade: {
    darkest: "#0F0F0F",
    darker: "#303030",
    dark: "#686868",
    mid: "#888888",
    light: "#c8c8c8",
    lighter: "#e2e2e2",
    lightest: "#fefefe",
  },
  spacing: {
    maxWidth: "1024px",
    minWidth: "320px",
    default: "15px",
  },
  font: {
    base:
      "'Atkinson Hyperlegible', Rubik, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    mono:
      "'Iosevka', 'Operator Mono', 'Fira Code', Monaco, Consolas, monospace",
    thin: 300,
    reg: 400,
    bold: 700,
  },
  transition: {
    default: property =>
      `transition: ${property} 0.4s cubic-bezier(.26,.1,.39,1.29)`,
  },
  before: `
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  `,
}
