---
id: shinyproxy-update
title: Update ShinyProxy
---

[![Hosting Data Apps](https://hub.analythium.io/assets/marks/hosting-banner-2.jpg)](https://hosting.analythium.io/)

Once your ShinyProxy server is up and running, you need to maintain and update it.
This section explains how to update existing apps and how to add new ones hassle free.

[![DO button](https://raw.githubusercontent.com/analythium/shinyproxy-1-click/master/digitalocean/images/do-btn-blue.svg)](https://marketplace.digitalocean.com/apps/shinyproxy?refcode=a8041699739d)

## Edit configuration

Create and `application.yml` file or use the file in the [previous](shinyproxy-setup) section as a starting point. The file is also available [here](https://github.com/analythium/shinyproxy-1-click/blob/master/digitalocean/application.yml).

The most important part is adding apps:

```vim
  - id: 02_hello
    display-name: Demo Shiny App
    description: App with sliders and large file upload
    container-cmd: ["R", "-e", "shiny::runApp('/root/app')"]
    container-image: analythium/shinyproxy-demo:latest
    logo-url: https://github.com/analythium/shinyproxy-1-click/raw/master/digitalocean/images/app-dots.png
    access-groups: [admins]
```

The keys for the apps are the following (see the official [docs](https://www.shinyproxy.io/documentation/configuration/#apps)). The three most important ones are:

* `id`: the identifier of the application, this will also be part of the path to the app
* `container-cmd`: the command that will be run when the Docker container is launched
* `container-image`: name of the docker image to be started for every new user of this app

The Docker images need to be pulled beforehand. If you are using private images, `docker login` will also be required before pulling images.

## Docker login

This step is optional if private registry access is needed for pulling Docker images.

Log into your droplet via ssh and lig into your registry via `docker login`
(Docker Hub by default, use `docker login registry.gitlab.com` for the GitLab 
container registry). You will be asked to authenticate interactively
and your personal access token will be saved on the droplet for future use.

## Update script

Once your `application.yml` is ready, `cd` into the directory where the configuration file is located and download the following [script file](https://github.com/analythium/shinyproxy-1-click/blob/master/digitalocean/setup.sh):

```bash
wget -O ./update.sh https://raw.githubusercontent.com/analythium/shinyproxy-1-click/master/digitalocean/setup.sh
```

Use the `setup.sh` as:

```bash
bash setup.sh -i ~/.ssh/id_rsa -s root@ip_address -f application.yml
```

The following command line arguments need to be passed to the `setup.sh` script:

- `-i`: path to your ssh key,
- `-s`: user name (root for DigitalOcean droplets) and the IP address: `user@ip_address`,
- `-f`: path and file name to the yml with the ShinyProxy config, e.g. `/path/to/application-new.yml`.

The script then takes care of the rest:

1. Copies the `application.yml` to the droplet,
2. pulls the Docker images listed in the `application.yml` file: updates the ones already pulled before, and the ones newly added too,
3. and restarts the ShinyProxy and Docker services.

## Cron

If the config file is not changing (i.e. no new apps added), you can set up cron job to regularly update the images that are already pulled to the server.

We have access to the cron utility: run `crontab -e`,
pick an editor (nano) if you haven't done so already and then add
these lines to the bottom and save it:

```bash
# Cleanup at 3:00am every Sunday
0 3 * * 0 docker system prune -f

# Update all images at 1:00am every day
0 1 * * * docker images |grep -v REPOSITORY|awk '{print $1":"$2}'|xargs -L1 docker pull
```

The cleanup command removes dangling (not needed) images that take up unnecessary space.

The second command updates all the images that are already present.

Check settings using `crontab -l`.

Cron jobs represent a polling type of update, which means we are regularly checking for updates. However, if changes to the images are infrequent, there is no need for constant polling. Setting cron intervals too large might lead to missing important updates.

![API polling vs webhook](../../img/shinyproxy/webhook.png 'API polling vs webhook')

Webhooks in general are [considered a better alternative to polling](https://blog.cloud-elements.com/webhooks-vs-polling-youre-better-than-this), although webhooks require a bit more work. The next section will explain how to do it.

:::note Further reading
* [Cron guide](https://www.digitalocean.com/community/tutorials/how-to-use-cron-to-automate-tasks-ubuntu-1804)
:::

[![Hosting Data Apps](https://hub.analythium.io/assets/marks/hosting-banner-2.jpg)](https://hosting.analythium.io/)
