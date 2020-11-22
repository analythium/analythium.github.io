---
id: shiny
title: Shiny
sidebar_label: Introduction
description: Quickly build prototypes for data analytics applications.
keywords:
  - Docs
  - Documentation
  - Analythium
  - Analythium Hub
image: https://source.unsplash.com/3GZi6OpSDcY
---

![Shiny from RStudio](../../img/shiny/shiny-rstudio.png 'Shiny from RStudio')

## What is R?

[R](https://www.r-project.org/) is a free software environment for
statistical computing and graphics. It compiles and runs on a wide
variety of operating systems.

R, either using its base functionality or the
[tidyverse](https://www.tidyverse.org/) packages,
is superb for both interactive and non-interactive use.

## What is Shiny

[Shiny](https://shiny.rstudio.com/) is an R
extension package that that makes it easy to build interactive web apps.
This is the reason it is ideal for quickly making prototypes, but it is
also a decent choice for building production-ready applications.

:::info
Shiny combines the power of R with the interactivity of the modern web.
See this [tutorial](https://shiny.rstudio.com/tutorial/)
and [book](https://mastering-shiny.org/) for accessible introductions.
:::

### Installing Shiny

You need R installed. Useful to also have an integrated development
environment (IDE): pick either the free [RStudio Desktop](https://rstudio.com/products/rstudio/download/)
or [VS Code](https://code.visualstudio.com/download) with [R language support](https://github.com/Ikuyadeu/vscode-R)
to get going quicker.

Install Shiny by running the following line in R:

```r
install.packages("shiny")
```

### A Shiny example

The following simple example draws a histogram of randomly generated
numbers between 0 and 1. As you increase the number of observations,
the top of the distribution changes slightly:

![Shiny from RStudio](../../img/shiny/shiny-hello.gif 'Shiny Hello')

We are going to build this simple Shiny app next.
### Structure of a Shiny app

The following sections will show how Shiny apps are structured:

1. the [user interface (UI)](shiny-ui),
2. the [server function](shiny-server),
3. and the [app](shiny-app) that contains the UI and the server.
