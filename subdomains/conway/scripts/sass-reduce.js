const fs = require("fs")
const path = require("path")

const sassFolder = path.join(__dirname, "../src/styles/scss")
const sassOut = "index.scss"

if (fs.existsSync(`${sassFolder}/${sassOut}`)) {
  fs.unlinkSync(`${sassFolder}/${sassOut}`)
}

const stream = fs.createWriteStream(`${sassFolder}/${sassOut}`)
fs.readdirSync(sassFolder).forEach(fileName => {
  if (fileName !== sassOut)
    stream.write(`@import "${fileName.replace(".scss", "")}";${"\n"}`)
})
stream.end()

console.log(
  "Sass files have been compiled successfully!\n\nNow watching changes to existing files",
)
