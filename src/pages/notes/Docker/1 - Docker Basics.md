# 1 - Docker Basics

## What is a Dockerfile

A `Dockerfile` is a text document that contains a set of instructions which are passed on command line to assemble the _image_ which sets up the container. An **image** is just the term used to specify the blueprint of the environment created for running the contained software.

All docker commands are executed by using a _COMMAND_ followed by the command _VALUES_ or _OPERATIONS_. Instead of listing off every command with their use case, an explanation and all its combinations, I'll just reference [this great resource](https://kapeli.com/cheat_sheets/Dockerfile.docset/Contents/Resources/Documents/index) that does just that.

Here is an example of completed Dockerfile:

```Dockerfile
# ./Dockerfile

FROM node:boron-alpine              # base image: Alpine Linux + Node.js
RUN mkdir -p /usr/app               # mkdir inside container
WORKDIR /usr/app                    # cd to /usr/app
COPY package.json .                 # copy package.json to current directory
RUN npm cache clean && npm install  # install node_modules
VOLUME /usr/app/node_modules        # specify fs mount point
COPY . .                            # copy all source code into /usr/app
VOLUME /usr/app                     # specify fs mount point
EXPOSE 8080                         # specify port to expose on container

# Other commands: CMD, ENV. ADD, USER, ENTRYPOINT, ONBUILD
```

Another important concept that may be important for your Docker use case is the ability to persist data. In the above `Dockerfile`, the `VOLUME` command does just that. It specifies the host storage file system mounted to the container so that data can be persisted even if the container isn't running.

For the most part, dockerfiles are straight forward, and the syntax can almost just be read and understood.

## Command Line

Docker comes with a helpful command line interface that can assist you in managing your containers. The [full docs](https://docs.docker.com/engine/reference/commandline/cli/) are pretty expansive, so there really is no need to talk about it. If ever you need it though, simply invoking the `docker` command will bring up some helpful usage docs as well:

```shell
$ docker

Usage:	docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default "/Users/leanderrodrigues/.docker")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level ("debug"|"info"|"warn"|"error"|"fatal") (default "info")
  ...

Management Commands:
  builder     Manage builds
  config      Manage Docker configs
  container   Manage containers
  image       Manage images
  ...

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes
  ...

Run 'docker COMMAND --help' for more information on a command.
```
