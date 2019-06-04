# 2 - Docker Compose

Docker Compose is a useful tool for defining applications that span multiple containers. The configuration for these Docker applications in written in a YAML file, entitled `docker-compose.yml` invoking the `docker-compose up` command will run the entire application within their individual containers. Docker Compose comes in handy when developing for multiple different environments (ex. _staging_, _production_, _development_, _testing_, even _CI_).

If you've ever heard the term `to dockerize` an application, then this is likely what they were referring to. Specifying containers for each component of your app to run inside to create your isolated environment (as specified by your Dockerfile). For automation/QA purposes, `docker-compose` can make black-box tests a breeze, since you can specify everything without worrying about caches or external factors.

One important thing to note is that `docker !== docker-compose`. You need to install Compose separately, probably using [this helpful guide](https://docs.docker.com/compose/install/).

Boiled down, there only a few main steps to create a basic `docker-compose` workflow:

1. Define your app’s environment with a `Dockerfile` so it can be reproduced anywhere.
2. Define the services that make up your app in `docker-compose.yml` so they can be run together in an isolated environment.
3. Run `docker-compose up` and Compose starts and runs your entire app.
   - The first time you'll do it, `--build` is a useful flag, since it will build the images before actually starting the container
   - Usually you'll run this command with the `-d` flag, meaning _detached mode_. This runs the containers in the background and will print their names on execution.
4. If you want to status of your containers, you can run `docker ps`.
5. To stop your containers, you guessed it, `docker-compose down`. This will kill them and remove them, clearing up your precious resources.

The following is an example of a simple `docker-compose.yml` file which will launch a WordPress/MySQL backend:

```yml
version: "3"

services:
  db:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    ports:
      - "8000:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
volumes:
  db_data: ...
```

Depending on your application you can even choose which of your containers you want to build so that you don't overwork your computer. This can extremely useful for debugging purposes. To do so simply call the usual start command, but specify the name of the container as the last parameter.

```bash
docker-compose up -d [SERVICE...]
```

Using the above example:

```bash
docker-compose up -d wordpress
```

---

Honestly most of the confusion surrounding Docker is handled through their expansive documentation, even the Command Line stuff. In case you ever get lost, visit [the docker docs](https://docs.docker.com/), the [docker-compose docs](https://docs.docker.com/compose/), or just attach the `--help` flag onto any of your commands.
