export const editorDefaultText = `     
# Heading 1
## Heading 2
### and so on
#### and so forth

---

**This is some bold text if you're trying to be \`strong\`**

_This is some italicized text if you wanna \`em\`phasize anything_

Here is an inline image! ![leander.xyz logo](https://dev.leander.xyz/favicon.ico "leander.xyz logo") (It's my logo, IKR it's cool)

> A fancy quote would go here

Some \`basic inline code\` with more text

\`\`\`
if (moreCode) {
  //put it here
  //multiline
}
\`\`\`

[I'm an inline link, check me out!](https://www.leander.xyz)

I can even do lists properly, like this one of cowboy words
- yeehaw
- ain't
1. tarnation
2. horse

I can even handle some big ol' tables

| Good | Bad                                     | 
| ---- | --------------------------------------- |
| Dogs | Death                                   |
| Love | Debt                                    |
| GoT  | Getting your foot run over by a tractor | 

`;
export const htmlDownloadStart = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>reMarked</title>
  </head>
  <body>
`;

export const htmlDownloadEnd = `
</body>
<style>
  :root {
    --light: rgb(248, 248, 248);
    --dark: rgb(34, 48, 62);
    --green: rgb(65, 184, 131);
    --honeydew: rgb(226, 245, 236);
  }
  html {
    font-size: 15px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    background: var(--honeydew);
  }
  body {
    margin: 1.5rem auto;
    max-width: 800px;
    padding: 0;
    position: relative;
    background: var(--light);
    border: 2px solid var(--dark);
    padding: 1rem;
    border-radius: 1rem;
  }
  a {
    color: var(--green);
  }
  blockquote {
    margin: 0.5rem 1.5rem;
    line-height: 1;
    padding: 0.1rem 1rem;
    border-radius: 0.25rem;
    border-left: 5px solid var(--green);
    background: var(--honeydew);
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }
  code {
    background: var(--honeydew);
    font-family: Consolas, 'Lucida Console', Monaco, monospace;
  }
  pre {
    background: var(--dark);
    border-radius: 0.25rem;
    padding: 0.5rem;
  }
  pre code {
    background: transparent;
    color: var(--light);
  }
  hr {
    height: 0px;
    border: 1px solid var(--green);
  }
  table {
    border-collapse: collapse;
  }
  table,
  th,
  td {
    border: 2px solid var(--green);
    padding: 0.25rem;
  }
  tr:nth-child(even) {
    background: var(--honeydew);
  }
  th {
    background: var(--green);
    color: var(--light);
  }
</style>
</html>
`;

export function dateText() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1 < 10 && "0"}${d.getMonth() +
    1}-${d.getDate() < 10 && "0"}${d.getDate()}`;
}
