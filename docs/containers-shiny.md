---
id: containers-shiny
title: Shiny in Docker
---

This section is based on the
[analythium/shinyproxy-hello](https://gitlab.com/analythium/shinyproxy-hello/) GitLab project. The demo Shiny app displays a slider and a histogram
inspired by the [example-01-hello](https://shiny.rstudio.com/gallery/example-01-hello.html)
Shiny example. The same application we build in the [Shiny](shiny) chapter.

The [analythium/shinyproxy-hello](https://gitlab.com/analythium/shinyproxy-hello/) project contains our demo Shiny app in the `app` folder:

```bash
.
├── app
│   ├── global.R
│   ├── server.R
│   └── ui.R
├── .gitignore
├── .gitlab-ci.yml
├── Dockerfile
├── LICENSE
├── README.md
└── shinyproxy-hello.Rproj
```

We will review some of the other files as well, particularly the `Dockerfile` and `.gitlab-ci.yml`.

## Pull image

We can pull the image made from the GitLab project's
[Gcontainer registry](https://gitlab.com/analythium/shinyproxy-hello/container_registry)
using the `docker pull` CLI command (we need to have the Docker Desktop running
on our local machine):

```bash
docker pull registry.gitlab.com/analythium/shinyproxy-hello/hello
```

## Image tag

The image is tagged as `REGISTRY/USER/PROJECT/IMAGE:TAG`. In this case the `TAG`
is `latest` which is the default tag when not specified otherwise.
(When the `REGISTRY` os not provided, Docker uses the Docker Hub as the default).

## Authentication

We don't need to authenticate for public images (like this one), but in case
we are trying to pull a private image from a private GitLab project, we
need to log into the GitLab Container registry as:

```bash
docker login registry.gitlab.com
```

This command will ask for our credentials interactively. If you want to provide
your username and password. It is recommended to use a personal access token (PAT)
instead of your password because PAT can have more restricted scopes, i.e.
only used to access the container registry which is a lot more secure:

```bash
cat ~/my_password.txt | docker login --username USER --password-stdin
```

where `~/my_password.txt` is a file with the PAT in it,
`USER` is the GitLab username.

## Run container

After pulling the image, we can use `docker run` to run a command in a new container
based on an the image. We use the `-p 4000:3838` argument and the image tag:

```bash
docker run -p 4000:3838 registry.gitlab.com/analythium/shinyproxy-hello/hello
```

The `-p` is a shorthand for `--publish`, that instructs Docker to publish a
container’s port to the host port. In our example, 3838 is the container's port
which is mapped to the 4000 port of the host machine. As a result, we can
then visit `127.0.0.1:4000` where we'll find the Shiny app.
Hit Ctrl+C to stop the container.

Read all about the `docker run` command [here](https://docs.docker.com/engine/reference/commandline/run/). We well learn about the 3838 port in a bit.

## Shiny host and port

When we talked about `runApp` we did not review all the possible arguments to this R function. Besides the app location (app object, list, file, or directory)
there are two other important arguments:

* `host`: this defines the IP address (defaults to 'localhost': 127.0.0.1)
* `port`: TCP port that the application should listen on; a random port when no value provided

When we run the shiny app locally, we see a message `Listening on http://127.0.0.1:7800`
or similar, which is the protocol (HTTP), the host address, and the port number.
The Shiny app is running in a web server that listens to client requests,
and provides a response.

![Shiny request/response](../../img/docker/shiny-req-res.png 'Shiny request/response')

## Build image

Let's create a file named `Dockerfile` (`touch Dockerfile`) then
open the file and copy the following text into the file then save:

```Dockerfile
FROM rocker/r-base:latest
LABEL maintainer="USER <user@example.com>"
RUN apt-get update && apt-get install -y --no-install-recommends \
    sudo \
    libcurl4-gnutls-dev \
    libcairo2-dev \
    libxt-dev \
    libssl-dev \
    libssh2-1-dev \
    && rm -rf /var/lib/apt/lists/*
RUN install.r shiny
RUN echo "local(options(shiny.port = 3838, shiny.host = '0.0.0.0'))" > /usr/lib/R/etc/Rprofile.site
RUN addgroup --system app \
    && adduser --system --ingroup app app
WORKDIR /home/app
COPY app .
RUN chown app:app -R /home/app
USER app
EXPOSE 3838
CMD ["R", "-e", "shiny::runApp('/home/app')"]
```

To build the image from the Dockerfile, run

```bash
docker build -t registry.gitlab.com/analythium/shinyproxy-hello/hello .
```

The `-t` argument is the tag, the `.` at the end refers to the _context_ of the build, which is our current directory (i.e. where the `Dockerfile` resides) with a set of files based on which the image is built.

## Push image

We can push the locally build Docker image to the container registry:

```bash
docker push registry.gitlab.com/analythium/shinyproxy-hello/hello
```

:::note
The image tag should start with the registry name unless you
are pushing to Docker Hub.
:::

## Dockerfile

Let's review the file line by line. The full Dockerfile reference can be found [here](https://docs.docker.com/engine/reference/builder/).

The [`FROM` instruction](https://docs.docker.com/engine/reference/builder/#from) initializes a new build stage and sets the _base image_.
We take the latest `r-base` image from the `rocker` project (see on [Docker Hub](https://hub.docker.com/r/rocker/r-base)):

```Dockerfile
FROM rocker/r-base:latest
```

The `LABEL` instruction is optional, it adds metadata to an image, e.g. who to contact in case of issues or questions:

```Dockerfile
LABEL maintainer="USER <user@example.com>"
```

The [`RUN` instruction](https://docs.docker.com/engine/reference/builder/#run) executes the command in a new _layer_ (a [layer](https://docs.docker.com/glossary/#layer) is modification to the image) on top of the current image. The following command updates the base image with a couple of libraries that are required by Shiny and related R packages (system dependencies):

```Dockerfile
RUN apt-get update && apt-get install -y --no-install-recommends \
    sudo \
    libcurl4-gnutls-dev \
    libcairo2-dev \
    libxt-dev \
    libssl-dev \
    libssh2-1-dev \
    && rm -rf /var/lib/apt/lists/*
```

The following `RUN` command uses the [littler](https://github.com/eddelbuettel/littler) command line interface shipped with the `r-base` image to install the Shiny package and its dependencies:

```Dockerfile
RUN install.r shiny
```

The next command sets options in the `Rprofile.site` file which are going to be loaded by the R session. These options specify the Shiny host and port that `runApp` will use:

```Dockerfile
RUN echo "local(options(shiny.port = 3838, shiny.host = '0.0.0.0'))" > /usr/lib/R/etc/Rprofile.site
```

The following command creates a linux group and user, both called `app`.
This is a rather important security consideration for containers:
we do not want the container to run as root. Running the container with root privileges allows unrestricted use which is to be avoided in production
(read more about advantages [here](https://engineering.bitnami.com/articles/why-non-root-containers-are-important-for-security.html)):

```Dockerfile
RUN addgroup --system app \
    && adduser --system --ingroup app app
```

The [`WORKDIR` instruction](https://docs.docker.com/engine/reference/builder/#workdir) sets the working directory for subsequent instructions. We change this to the home folder of the `app` user which is `/home/app`:

```Dockerfile
WORKDIR /home/app
```

The [`COPY` instruction](https://docs.docker.com/engine/reference/builder/#copy) copies new files or directories from the source (our `app` folder containing the R script files for our Shiny app) and adds them to the filesystem of the container at the destination path (`.` refers to the current work directory defined at the previous step):

```Dockerfile
COPY app .
```

The next command sets permissions for the `app` user:

```Dockerfile
RUN chown app:app -R /home/app
```

The [`USER` instruction](https://docs.docker.com/engine/reference/builder/#user) sets the user name (or UID) and optionally the user group (or GID) to use when running the image:

```Dockerfile
USER app
```

The [`EXPOSE` instruction](https://docs.docker.com/engine/reference/builder/#expose) tells Docker which ports the container listens on at runtime. We set this to the Shiny port defined in the `Rprofile.site` file:

```Dockerfile
EXPOSE 3838
```

Finally, the [`CMD` instruction](https://docs.docker.com/engine/reference/builder/#cmd) closes off our `Dockerfile`.
The `CMD` instruction provides the defaults for an executing container.
There can only be one `CMD` instruction in a `Dockerfile` (only the last `CMD` will take effect). Our `CMD` specifies the executable (`"R"`) and parameters for the executable () in an array. The `-e` option means we are running an expression that is `shiny::runApp('/home/app')`. The expression will run the Shiny app that we copied into the `/home/app` folder:

```Dockerfile
CMD ["R", "-e", "shiny::runApp('/home/app')"]
```

We can build the image using `docker build` by speficying the tag and the context:

```bash
docker build -t registry.gitlab.com/analythium/shinyproxy-hello/hello .
```

## CI/CD

The following continuous integration/continuous deployment (CI/CD)
section assumes that we are using GitLab as our source control platform.
Similar setup is possible with GitHub actions, but is a bit more complicated.

The following text should be added to `.gitlab-ci.yml` in the root of the
project:

```yml
stages:
  - build

build-app:
  stage: build
  image: docker:stable
  services:
    - docker:dind
  variables:
    APP_NAME: "hello"
    CONTAINER_IMAGE: "$CI_REGISTRY/$CI_PROJECT_PATH/$APP_NAME"
    DOCKER_HOST: tcp://docker:2375
    DOCKER_DRIVER: overlay2
  only:
    - master
  script:
    - docker login -u gitlab-ci-token -p $CI_JOB_TOKEN $CI_REGISTRY
    - docker pull $CONTAINER_IMAGE:latest || true
    - docker build --cache-from $CONTAINER_IMAGE:latest --tag $CONTAINER_IMAGE:latest .
    - docker push $CONTAINER_IMAGE:latest
```

This will build the Docker image and push it to the container registry.
The pipeline results can be seen [here](https://gitlab.com/analythium/shinyproxy-hello/-/pipelines), the image is [here](https://gitlab.com/analythium/shinyproxy-hello/container_registry).

Further reading:

* [R Docker tutorial](https://ropenscilabs.github.io/r-docker-tutorial/)
* [Docker for R users](https://colinfay.me/docker-r-reproducibility/)
* [An Introduction to Rocker](https://journal.r-project.org/archive/2017/RJ-2017-065/RJ-2017-065.pdf)
* [The Rockerverse](https://journal.r-project.org/archive/2020/RJ-2020-007/RJ-2020-007.pdf)
* [GitLab CI/CD](https://docs.gitlab.com/ee/ci/introduction/)
