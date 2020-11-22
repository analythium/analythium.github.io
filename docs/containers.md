---
id: containers
title: Containers
sidebar_label: Introduction
description: Apps are meant to be used to make decisions in the real world.
keywords:
  - Docs
  - Documentation
  - Analythium
  - Analythium Hub
image: https://source.unsplash.com/uBe2mknURG4
---

Containers provide portability, consistency, and are used for packaging, deploying, and running cloud-native data science applications.

![Make an impact](../../img/undraw_personal_goals_edgd_manage.svg)

[Docker](https://www.docker.com/) is the most popular virtualization to
deliver software in containers. Containers bundle their own software, libraries and configuration files and are isolated from one another.
Containers are the run-time environment that depends on so called images.

Docker is well supported by the R community, the [Rocker](https://www.rocker-project.org/)
provides different base images. (See [this](https://journal.r-project.org/archive/2017/RJ-2017-065/RJ-2017-065.pdf) and [this](https://journal.r-project.org/archive/2020/RJ-2020-007/RJ-2020-007.pdf) article for a thorough review.)

In this section we will review how to containerize a Shiny application,
first reviewing the basics of [working with Docker containers](containers-docker), than we'll see how to create a [Docker image with a Shiny app](containers-shiny).
