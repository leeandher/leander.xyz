# Markdown PreVuer

It's a pun get it! It's a good pun I came up with in the shower and coded in a day. I wanted to make a markdown previewer and I wanted to learn Vue.js some more so I put em together. It fits in that sweet spot just too enough work that it looks good, but still way too much to put into a joke app.

Anyway it turned out pretty good and you can check it out over at https://md-prevuer.leander.xyz.

## What to do

The entire app relies on a knowledge of markdown so thats step number one. Markdown is just a nicer markup language for writing text and ends up being super readable when you're done.

Just type in a bunch of stuff in markdown into the _editor_ pane and you'll be able to a formatted pretty version of your document to in the _preview_ pane. It all the basic markdown features and even stuff like tables and quotes.

When you're done typing out your markdown, you can simply export the `.md` file, or the prettier `.html` and go about your business. Pretty neat tool if i do say so myself (and I do).

## How it was made

It's a pretty simple Vue app created through the `vue create` CLI tool. After that it uses the `marked` library to parse the inputted text. The styling and CSS is all done by yours truly, with a colour palette stolen from the Vue.js docs. Lastly, the export options were added as a bonus feature to give it some actual usability, tied together with custom logic and the `FileSaver` library.
