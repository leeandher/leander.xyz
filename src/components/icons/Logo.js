import React from "react"

const Logo = ({ accent, size, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 1528 1528" {...props}>
    <title>leander.xyz logo</title>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#FEFEFE"
        d="M984.835 249.444L472.04 762.238l146.81 146.81 366.281-366.282 220.216 220.216-146.513 146.512-146.81-146.81-146.513 146.513.596 586.645 205.117-205.118-.178-175.993 88.086 88.086 439.537-439.538z"
      />
      <path
        fill={accent}
        d="M765.429 30.038L32.866 762.6l733.95 733.95-.278-293.303-440.37-440.37 586.05-586.05z"
      />
    </g>
  </svg>
)

export default Logo
