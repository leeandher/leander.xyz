exports.onRenderBody = ({ setBodyAttributes }) => {
  setBodyAttributes({ style: { margin: 0, boxSizing: "border-box" } })
}
