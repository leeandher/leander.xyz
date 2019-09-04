---
type: projects
showcase: true
slug: conway
title: Conway's Game of Life
description: >-
  A zero-player game evolution game to simulate Conway's Game of Life. Best
  part: Dark mode!
image: /assets/project__conway.png
repo: 'https://github.com/leeandher/Conways-Game-of-Life'
link: 'https://conway.leander.xyz'
tech:
  - react
  - redux
  - node
  - sass
  - webpack
  - antd
date: 2018-12-11T00:54:57.457Z
---

This is a single-page application I built to simulate [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). You can check out the live demo over at [conway.leander.xyz](https://conway.leander.xyz).

This simulation app models the 'zero-player game' which serves more as a evolution/mathematics model than a real game. In essence, a rid contains cells which can either be _living_ (colored) or _dead_ (blank). Each cell's _neighbors_ are specified by the surrounding 8 cells (think of a furnace in Minecraft). Next, the board _evolves_, with the next _generation_ adhering to 4 simple rules:

1. Any live cell with fewer than two live neighbors dies, as if by under-population.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

In my variation, you can actually track the newborn cells since they appear with a lighter shade. Other than that, the newborn cells and old cells are functionally identical.

The game doesn't have an ending, since eventually the board becomes relatively stable and following generations change less and less, but the main point is to be able to _visualize_ how the ecosystem evolves!

## Using the app

The algorithm running the game does pretty much all the heavy lifting here. Simply sit back and watch your simulation run however you specify. On the left, there's a navigation menu containing a few settings you can play around with.

Above the divider are the management options. The ability to **play/pause** the simulation, as well as **clear**, **randomize** it. The **increment** feature works best when paused, letting you track each generation individually. You can even **click** on individual tiles to toggle between alive and dead cells.

Below the divider are the configuration settings. Things like **board size**, and **evolution speed** will let you choose how you visualize the evolution. The **presets** load some boards I made myself, might be interesting to watch.

You may also notice the label above the board with some italicized text. That's actually just a dummy input for naming your simulation, so you can type whatever you like (I randomized it's defaults a bit, let me know if you think I'm funny).

## How it Works

This app was developed to work completely locally, reaching for no external resources. It was developed in **React** and uses **Redux** for passing data around. **Webpack** was used to package the application and keep it fast and efficient.

As for the UI, It was developed with the help of **Ant.Design**, a popular UI design language for React. Some of the custom styling was done with the help of **Sass**, and **node-sass** for hot-reloading in development.
