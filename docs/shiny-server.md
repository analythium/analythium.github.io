---
id: shiny-server
title: Server Function
---

[![Hosting Data Apps](https://hub.analythium.io/assets/marks/hosting-banner-2.jpg)](https://hosting.analythium.io/)

The server function contains the instructions for the reactivity needed for the Shiny app.

The following function takes two arguments: `input` and `output`. These
objects are created by Shiny when the session begins and passed to the server
function.

`input` is used to pass the control values, in this case `input$obs` the number
of observations. Notice how it is used to generate random numbers from
a Normal distribution:

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

The `output` object contains the output objects, in our case the rendered plot.
`input` and `output` together describe the state of the app.

:::note Further reading
* [The anatomy of a Shiny application](https://hosting.analythium.io/the-anatomy-of-a-shiny-application?utm_source=as-hub&utm_medium=web&utm_campaign=launch-april-2021)
* [Reactive output](https://shiny.rstudio.com/tutorial/written-tutorial/lesson4/)
* [Basic reactivity](https://mastering-shiny.org/basic-reactivity.html)
* [Reactive expressions](https://shiny.rstudio.com/tutorial/written-tutorial/lesson6/)
:::

[![Hosting Data Apps](https://hub.analythium.io/assets/marks/hosting-banner-2.jpg)](https://hosting.analythium.io/)
