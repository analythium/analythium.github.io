---
id: shinyproxy-setup
title: Set Up ShinyProxy
---

The ShinyProxy chapter here describes how to set up and customize your very own ShinyProxy server on Ubuntu (18.04 or 20.04).

If you are short on time, the __1-Click option__ lets you deploy ShinyProxy on DigitalOcean droplets in fully-tested app environments.
You can use [this referral link](https://m.do.co/c/a8041699739d) to sign up to DigitalOcean if you don't yet have an account.

[![DO button](https://raw.githubusercontent.com/analythium/shinyproxy-1-click/master/digitalocean/images/do-btn-blue.svg)](https://marketplace.digitalocean.com/apps/shinyproxy)


<iframe width="560" height="315" src="https://www.youtube.com/embed/aoIlaOYRpQs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Create a VM

:::tip
You can use your preferred cloud provider or bare metal server
running Ubuntu (18.04 or 20.04) for ShinyProxy. But the rest
of the tutorial assumes that you use DigitalOcean droplet
with Ubuntu 20.04 (LTS).
:::

Use DigitalOcean control panel to create a Droplet based on the
[one of the supported OS-es](https://github.com/digitalocean/marketplace-partners#supported-operating-systems)
for Marketplace images.
Select your preferred region, don't forget to add SSH keys.

## Install

Once your droplet is up an running, log in with
`ssh -i ~/YOUR_SSH_KEY root@YOUR_IP_ADDRESS`,
use your SSH key and IP address.

Update:

```bash
sudo apt-get update
sudo apt-get upgrade
```

### Java

First, install Java:

```bash
sudo apt-get install default-jre
sudo apt-get install default-jdk
```

`java -version` should return something like this:

```bash
openjdk version "11.0.8" 2020-07-14
OpenJDK Runtime Environment (build 11.0.8+10-post-Ubuntu-0ubuntu120.04)
OpenJDK 64-Bit Server VM (build 11.0.8+10-post-Ubuntu-0ubuntu120.04, mixed mode, sharing)
```

### Docker

We will install Docker CE (community edition) and Docker Compose:

```bash
sudo apt-get install docker
sudo apt-get install docker-compose
```

Check to see if Docker is running `sudo service docker status`.

ShinyProxy needs to connect to the docker daemon to spin up the containers for the apps.
By default ShinyProxy will do so on port 2375 of the docker host.
In order to allow for connections on port 2375, the startup options need to be edited
following the ShinyProxy [guide](https://www.shinyproxy.io/getting-started/#docker-startup-options).

On an Ubuntu 16.04 LTS or higher that uses `systemd`,
one can create a file `/etc/systemd/system/docker.service.d/override.conf`:

```bash
mkdir /etc/systemd/system/docker.service.d
touch /etc/systemd/system/docker.service.d/override.conf
```

Add the following content (`vim /etc/systemd/system/docker.service.d/override.conf`):

```bash
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd -H unix:// -D -H tcp://127.0.0.1:2375
```

Reload the system daemon and restart Docker:

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
sudo systemctl enable docker
```

The `sudo systemctl enable docker` enables Docker service start when the system boots.

### ShinyProxy

We download the 2.4.0 version of Shinyproxy (in case of newer version, just change the file name accordingly, check for updates [here](https://www.shinyproxy.io/downloads/)):

```bash
sudo wget https://www.shinyproxy.io/downloads/shinyproxy_2.4.0_amd64.deb
sudo apt install ./shinyproxy_2.4.0_amd64.deb
sudo rm shinyproxy_2.4.0_amd64.deb
```

### Images

Pull two demo Docker images &ndash; one of these images is the one we just built in the previous chapter:

```bash
sudo docker pull analythium/shinyproxy-demo:latest
sudo docker pull registry.gitlab.com/analythium/shinyproxy-hello/hello:latest
```

### Configuration

Create `application.yml` in the `/etc/shinyproxy` directory:

```bash
cd /etc/shinyproxy
sudo touch application.yml
```

You can put here the `favicon.ico` file as desired.

Now copy these configs using `vim /etc/shinyproxy/application.yml`:

```vim
proxy:
  title: ShinyProxy
#  logo-url: https://link/to/your/logo.png
  landing-page: /
  favicon-path: favicon.ico
  heartbeat-rate: 10000
  heartbeat-timeout: 600000
  port: 8080
  authentication: simple
  admin-groups: admins
  # Example: 'simple' authentication configuration
  users:
  - name: admin
    password: password
    groups: admins
  - name: user
    password: password
    groups: users
  # Docker configuration
  docker:
    cert-path: /home/none
    url: http://localhost:2375
    port-range-start: 20000
  specs:
  - id: 01_hello
    display-name: Hello Shiny App
    description: A simple reactive histogram
    container-cmd: ["R", "-e", "shiny::runApp('/root/app')"]
    container-image: registry.gitlab.com/analythium/shinyproxy-hello/hello:latest
    logo-url: https://github.com/analythium/shinyproxy-1-click/raw/master/digitalocean/images/app-hist.png
    access-groups: [admins, users]
  - id: 02_hello
    display-name: Demo Shiny App
    description: App with sliders and large file upload
    container-cmd: ["R", "-e", "shiny::runApp('/root/app')"]
    container-image: analythium/shinyproxy-demo:latest
    logo-url: https://github.com/analythium/shinyproxy-1-click/raw/master/digitalocean/images/app-dots.png
    access-groups: [admins]

logging:
  file:
    shinyproxy.log

spring:
  servlet:
    multipart:
      max-file-size: 200MB
      max-request-size: 200MB
```

Edit `/etc/shinyproxy/application.yml` as required (file size limits, apps, `heartbeat-timeout`),
then restart ShinyProxy to take effect using `sudo service shinyproxy restart`.
Read the ShinyProxy [configuration](https://www.shinyproxy.io/documentation/configuration/) documentation.

Besides adding apps and permissions, edits were made to increase file size limit
and the default `heartbeat-timeout: 60000` (1 minute in milliseconds) to `600000` (10 mins), etc. We found these settings more justified in production based on user feedback.

Now `cd ~` back to the home (`/root`) folder to continue.

### Nginx

ShinyProxy is now can be accessed at `YOUR_IP_ADDRESS:8080`. We can set the port to 80
which is the standard HTTP port.
Install Nginx:

```bash
sudo apt-get install nginx
```

Edit the config file:

```bash
sudo vim /etc/nginx/sites-enabled/default
```

Find the `location / {` line and add the following:

```bash
location / {
    proxy_pass          http://127.0.0.1:8080/;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 600s;

    proxy_redirect    off;
    proxy_set_header  Host             $http_host;
    proxy_set_header  X-Real-IP        $remote_addr;
    proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
    proxy_set_header  X-Forwarded-Protocol $scheme;
}
```

Add `client_max_body_size 200M;` to the `server {` block if handling large files is needed.

Restart nginx with `sudo service nginx restart` and you can access the site at `http://YOUR_IP_ADDRESS/`.

### Firewall

UFW is an Uncomplicated Firewall.
We enables the UFW firewall to allow only SSH, HTTP and HTTPS.
See a detailed tutorial [here](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-20-04).

```bash
sudo apt install ufw

sudo ufw default deny incoming
sudo ufw default allow outgoing

sudo ufw allow ssh
sudo ufw allow http
```

Finally, enable these rules by running
`sudo ufw enable`. This also disables the previously used 8080 port.
Check `ufw status` to see:

```bash
Status: active

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
22/tcp (v6)                ALLOW       Anywhere (v6)
80/tcp (v6)                ALLOW       Anywhere (v6)
```
