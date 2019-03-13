export const palette = {
  color: {
    red: " #ce2d48",
    orange: "#ff9f1c",
    yellow: "#ffd43a",
    green: "#7ae582",
    teal: "#00cccc",
    blue: "#0582ca",
    purple: "#b65fd1",
    pink: "#d33797",
  },
  shade: {
    darkest: "#0F0F0F",
    darker: "#303030",
    dark: "#686868",
    mid: "#d8d8d8",
    light: "#f2f2f2",
    lighter: "#fefefe",
  },
  spacing: {
    default: "15px",
  },
  font: {
    family: "Rubik",
    thin: 300,
    reg: 400,
    bold: 600,
  },
  transition: {
    default: property =>
      `transition: ${property} 0.4s cubic-bezier(.26,.1,.39,1.29)`,
  },
}
