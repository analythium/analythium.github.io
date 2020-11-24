---
id: shinyproxy-webhook
title: CI/CD with Webhook
---

This guide explains how to set up webhook for ShinyProxy.
We assume ShinyProxy is running on DigitalOcean droplet
with Ubuntu 20.04 (LTS).

[![DO button](https://raw.githubusercontent.com/analythium/shinyproxy-1-click/master/digitalocean/images/do-btn-blue.svg)](https://marketplace.digitalocean.com/apps/shinyproxy)

## Port for webhook

UFW is an Uncomplicated Firewall.
We enables the UFW firewall to allow only SSH, HTTP and HTTPS.
See a detailed tutorial [here](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-20-04).
Settings we did [previously](shinyproxy-setup) are commented out, uncomment
as needed.

```bash
#sudo apt install ufw

#sudo ufw default deny incoming
#sudo ufw default allow outgoing

#sudo ufw allow ssh
#sudo ufw allow http
#sudo ufw allow https
sudo ufw allow 9000
```

Finally, enable these rules by running `sudo ufw enable`. 
Check `ufw status`.

## Install webhook

We are going to use [webhook](https://github.com/adnanh/webhook).
The community maintained `sudo apt-get install webhook` gives a really outdated version.
Therefore we pick the latest (2.7.0) using pre-compiled binary for our
architecture (if in doubt, check `dpkg --print-architecture`):

```bash
sudo wget https://github.com/adnanh/webhook/releases/download/2.7.0/webhook-linux-amd64.tar.gz
tar -zxvf webhook-linux-amd64.tar.gz
```

Next we will follow [this](https://davidauthier.com/blog/2017/09/07/deploy-using-github-webhooks/) guide
and we move the binary and other files with settings in the `/var/www/webhooks` directory:

```bash
sudo mkdir /var/www/webhooks
sudo cp webhook-linux-amd64/webhook /var/www/webhooks/
rm -rf *
```

## Hook definitions

Create the file `hooks.json` to store the hook definitions:

```bash
sudo touch /var/www/webhooks/hooks.json
```

The following array of hook definitions goes inside (`vim /var/www/webhooks/hooks.json`):

```json
[
  {
    "id": "pull-all-gitlab",
    "execute-command": "webhook-pull-all-gitlab",
    "response-message": "Pulling all Docker images.",
    "response-headers":
    [
      {
        "name": "Access-Control-Allow-Origin",
        "value": "*"
      }
    ],
    "trigger-rule": {
      "match":
      {
        "type": "value",
        "value": "secret_token_1234",
        "parameter":
        {
          "source": "header",
          "name": "X-Gitlab-Token"
        }
      }
    }
  },
  {
    "id": "pull-one-gitlab",
    "execute-command": "webhook-pull-one-gitlab",
    "response-message": "Pulling Docker image.",
    "response-headers":
    [
      {
        "name": "Access-Control-Allow-Origin",
        "value": "*"
      }
    ],
    "pass-arguments-to-command": [
      {
        "source": "payload",
        "name": "image_name"
      }
    ],
    "trigger-rule": {
      "match":
      {
        "type": "value",
        "value": "secret_token_1234",
        "parameter":
        {
          "source": "header",
          "name": "X-Gitlab-Token"
        }
      }
    }
  },
  {
    "id": "pull-one-dockerhub",
    "execute-command": "webhook-pull-one-dockerhub",
    "response-message": "Pulling Docker image from Docker Hub.",
    "response-headers":
    [
      {
        "name": "Access-Control-Allow-Origin",
        "value": "*"
      }
    ],
    "pass-arguments-to-command": [
      {
        "source": "payload",
        "name": "repository.repo_name"
      },
      {
        "source": "payload",
        "name": "push_data.tag"
      }
    ]
  }
]
```

### Update all images

This array contains 3 hooks. The 1st and the second is
set up to work with GitLab CI/CD pipelines.
See corresponding `.gitlab-ci.yml` file [here](https://gitlab.com/analythium/shinyproxy-hello/-/blob/master/.gitlab-ci.yml) (check parts that are commented out in the YAML file).

These need a secret header (value `"secret_token_1234"`)
that is used in the hook definition and in the webhook request. Change to some random
high entropy value.

The 1st hook definition calls the command `webhook-pull-all-gitlab` without arguments.
The command pulls the latest version of all the docker images that are on the server.
After that, it cleans up the dangling images. So let's put this command into
the `/bin` folder and make it executable:

```bash
sudo touch /bin/webhook-pull-all-gitlab
chmod 755 /bin/webhook-pull-all-gitlab
```

This is the content that goes inside the file:

```bash
#! /bin/sh
docker images |grep -v REPOSITORY|awk '{print $1":"$2}'|xargs -L1 docker pull
docker system prune -f
```

`docker login` might be needed when using private registries.

### GitLab registry

The second hook definition uses the command `webhook-pull-one-gitlab` which
pulls a single image based on the argument passed.

```bash
sudo touch /bin/webhook-pull-one-gitlab
chmod 755 /bin/webhook-pull-one-gitlab
```

The content of the file:

```bash
#! /bin/sh
docker pull $1
docker system prune -f
```

### Docker Hub

The 3rd hook definition is similar the previous hook in that it also pulls a single
docker image. But this one is written for the payload that Docker Hub's webhook
delivers (read more [here](https://docs.docker.com/docker-hub/webhooks/#example-webhook-payload)).

The image name and the tag are parsed separately, so the `webhook-pull-one-dockerhub`
takes these two arguments:

```bash
sudo touch /bin/webhook-pull-one-dockerhub
chmod 755 /bin/webhook-pull-one-dockerhub
```

```bash
#! /bin/sh
/usr/bin/docker pull $1:$2
/usr/bin/docker system prune -f
```

## Webhook service

Now create the `webhook.service` file with the daemon settings via `systemctl`:

```bash
sudo touch /etc/systemd/system/webhook.service
```

Put these into the service file (`vim /etc/systemd/system/webhook.service`):

```vim
[Unit]
Description=Webhooks

[Service]
ExecStart=/var/www/webhooks/webhook -hooks /var/www/webhooks/hooks.json -hotreload

[Install]
WantedBy=multi-user.target
```

The option `-hotreload` watches for changes in the `hook.json` file and reloads them upon change.

Run a few commands with `systemctl`:
`sudo systemctl enable webhook.service` to enable the newly created service,
`sudo systemctl start webhook.service` to start the service.

Now check the service status using `sudo service webhook status`. If all went well,
you should see something like:

```bash
● webhook.service - Webhooks
   Loaded: loaded (/etc/systemd/system/webhook.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2020-06-05 07:31:31 UTC; 6s ago
 Main PID: 5228 (webhook)
    Tasks: 6 (limit: 1152)
   CGroup: /system.slice/webhook.service
           └─5228 /var/www/webhooks/webhook -hooks /var/www/webhooks/hooks.json -hotreload
```
## Enabling HTTPS

Add `-secure` flag to watch over https. This requires also passing the certificate:
check name of certificate and private key in the dir `/etc/letsencrypt/live/example.com/`,
the add `-secure -cert /etc/letsencrypt/live/test.side-r.com/cert.pem -key /etc/letsencrypt/live/test.side-r.com/privkey.pem` to the `/etc/systemd/system/webhook.service` service file.
Use private key (`privkey.pem`) and `fullchain.pem` which is concatenation of the public key
(`cert.pem`) and the certificate chain (`chain.pem`).

Use `crontab -e` and add the line `0 2 * * * systemctl restart webhook.service`:
we need to restart the webhook daemon regularly (daily in this case)
because it is not updating when the TLS certificate is renewed.

## Testing with curl

Test it in `-verbose` mode: change `example.com` to your domain.
Have to open up another port, here 9001, because 9000 is taken by the daemon:
`/var/www/webhooks/webhook -hooks /var/www/webhooks/hooks.json -hotreload -verbose -secure -cert /etc/letsencrypt/live/test.side-r.com/fullchain.pem -key /etc/letsencrypt/live/test.side-r.com/privkey.pem -port 9001`

See more parameter settings [here](https://github.com/adnanh/webhook/blob/master/docs/Webhook-Parameters.md).

Note: we are testing over port 9001, but the real webhook is listening on port 9000.

### GitLab

We use `curl -i` to get the response headers: 200 is what we want. Make sure to use http
protocol (and not https) if SSL certificate is not set up and used.

```bash
curl -i --header "X-Gitlab-Token: secret_token_1234" https://YOUR_IP_OR_DOMAIN:9000/hooks/pull-all-gitlab
```

Using form data (url encoded, default header "Content-Type: application/x-www-form-urlencoded"):

```bash
curl -i --header "X-Gitlab-Token: secret_token_1234" \
  -X POST -d 'image_name=analythium/shinyproxy-demo:latest' \
  https://YOUR_IP_OR_DOMAIN:9000/hooks/pull-one-gitlab
```

Need to declare content-type header, payload is treated as form data by curl:

```bash
curl -i --header "X-Gitlab-Token: secret_token_1234" \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{"image_name":"analythium/shinyproxy-demo:latest"}' \
  https://YOUR_IP_OR_DOMAIN:9000/hooks/pull-one-gitlab
```

### Docker Hub

This is how the simplified Docker Hub payload looks like, we can use it to get the
image name and the tag:

```json
{
  "push_data": {
    "pusher": "trustedbuilder",
    "tag": "latest"
  },
  "repository": {
    "name": "testhook",
    "namespace": "svendowideit",
    "owner": "svendowideit",
    "repo_name": "svendowideit/testhook",
    "repo_url": "https://registry.hub.docker.com/u/svendowideit/testhook/",
    "star_count": 0,
    "status": "Active"
  }
}
```

Set webhook url as `https://YOUR_IP_OR_DOMAIN:9000/hooks/pull-one-dockerhub`.

## Wrapping up

At the end of all this, we have the full CI/CD experience over HTTPS:

![CI/CD workflow](../../img/shinyproxy/workflow.png 'CI/CD workflow')
