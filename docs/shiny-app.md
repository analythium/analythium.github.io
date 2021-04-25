---
id: shiny-app
title: Shiny App
---

With the [UI](shiny-ui)
and the [server function](shiny-server),
we can run the Shiny app locally:

```r
shinyApp(ui = ui, server = server)
```

## Single file app

We can combine the code so far into a single file, e.g. called `app.R`:

```r
library(shiny)

ui <- fluidPage(
    mainPanel(
        sliderInput("obs",
            "Number of observations",
            min = 1,
            max = 5000,
            value = 100),
        plotOutput("distPlot")
    )
)

server <- function(input, output) {
    output$distPlot <- renderPlot({
        dist <- rnorm(input$obs)
        hist(dist,
            col="purple",
            xlab="Random values")
    })
}

shinyApp(ui = ui, server = server)
```

What's new here is that we passed `ui` and `server` to `shinyApp()` which
returns the Shiny app object. This is passed to `runApp()` via the implicit print method to run the app.

The `runApp()` function can also take the
`app.R` file as argument because the file returns the app object:
`runApp("app.R")`.

## Multiple file app

An alternative to having everything for our app in a single `app.R` file, we can specify a directory where the `app.R` file can be found.
However, when a directory is specified, we can have the Shiny app components
in separate files. This usually helps in maintaining the app when it grows more complex.

It is good practice to create a `global.R` file with all the prerequisites
required by the app, i.e. loading libraries, scripts, data sets, running data
processing or defining functions. In our simple case we only load
the shiny package. Thus in our `global.R` file we'll have the following line:

```r
library(shiny)
```

The `ui.R` file contains the UI definition:

```r
ui <- fluidPage(
    mainPanel(
        sliderInput("obs",
            "Number of observations",
            min = 1,
            max = 5000,
            value = 100),
        plotOutput("distPlot")
    )
)
```

Similarly, we have a `server.R` file defining the `server` function:

```r
server <- function(input, output) {
    output$distPlot <- renderPlot({
        dist <- rnorm(input$obs)
        hist(dist,
            col="purple",
            xlab="Random values")
    })
}
```

We can now point `runApp()` to this directory.

## Deployment

Next we will look at Shiny app deployment.
Besides the officially recommended
deployment options, such as [shinyapps.io](https://www.shinyapps.io/)
or the [open source Shiny server](https://rstudio.com/products/shiny/download-server/), there are other possibilities.
One particular option that we will review in depth is the
deployment of Shiny apps via Docker and ShinyProxy. Read on!

:::note Further reading
* [Run Shiny apps locally](https://hosting.analythium.io/run-shiny-apps-locally?utm_source=as-hub&utm_medium=web&utm_campaign=launch-april-2021)
* [The anatomy of a Shiny application](https://hosting.analythium.io/the-anatomy-of-a-shiny-application?utm_source=as-hub&utm_medium=web&utm_campaign=launch-april-2021)
* [Deployment](https://shiny.rstudio.com/deploy/)
* [Sharing Shiny apps](https://shiny.rstudio.com/tutorial/written-tutorial/lesson7/)
:::

:::tip Contact us!
Are you considering a web application? Reach out to [Analythium](https://analythium.io/contact) if you need commercial support and consulting services!
:::
