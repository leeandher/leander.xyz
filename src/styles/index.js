// red: "#ef4d5d",
// orange: "#ff9f1c",
// yellow: "#ffd43a",
// green: "#7ae582",
// teal: "#00cccc",
// blue: "#0582ca",
// purple: "#b65fd1",
// pink: "#ff79a7",

export const palette = {
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
    family: "Rubik",
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
