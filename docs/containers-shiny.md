---
id: containers-shiny
title: Shiny Apps in Docker Containers
---

Text comes here.


```Dockerfile
FROM rocker/r-base:latest

RUN apt-get update && apt-get install -y --no-install-recommends \
    sudo \
    pandoc \
    pandoc-citeproc \
    libcurl4-gnutls-dev \
    libcairo2-dev \
    libxt-dev \
    libssl-dev \
    libssh2-1-dev \
    && rm -rf /var/lib/apt/lists/*

RUN install.r shiny rmarkdown

RUN echo "local(options(shiny.port = 3838, shiny.host = '0.0.0.0'))" > /usr/lib/R/etc/Rprofile.site

RUN mkdir /root/app

COPY app /root/app

EXPOSE 3838

CMD ["R", "-e", "shiny::runApp('/root/app')"]
```


# ShinyProxy Hello Image

The demo Shiny app displays some a slider and a histogram
inspired by the [example-01-hello](https://shiny.rstudio.com/gallery/example-01-hello.html)
Shiny example.

To pull the image made in this repository from
[GitLab Container Registry](https://gitlab.com/analythium/shinyproxy-hello/container_registry), use
```bash
sudo docker pull registry.gitlab.com/analythium/shinyproxy-hello/hello
```

To build the image from the Dockerfile, run
```bash
sudo docker build -t registry.gitlab.com/analythium/shinyproxy-hello/hello .
```

Test locally
```bash
docker run -p 4000:3838 registry.gitlab.com/analythium/shinyproxy-hello/hello
```
then visit `127.0.0.1:4000`.

![Shiny request/response](../../img/docker/shiny-req-res.png 'Shiny request/response')

Further reading:

* [R Docker tutorial](https://ropenscilabs.github.io/r-docker-tutorial/)
* [Docker for R users](https://colinfay.me/docker-r-reproducibility/)
* [An Introduction to Rocker](https://journal.r-project.org/archive/2017/RJ-2017-065/RJ-2017-065.pdf)
* [The Rockerverse](https://journal.r-project.org/archive/2020/RJ-2020-007/RJ-2020-007.pdf)
