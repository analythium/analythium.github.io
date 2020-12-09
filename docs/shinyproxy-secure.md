---
id: shinyproxy-secure
title: Secure ShinyProxy
---

This document guides you through TLS setup for ShinyProxy 1-click app

[![DO button](https://raw.githubusercontent.com/analythium/shinyproxy-1-click/master/digitalocean/images/do-btn-blue.svg)](https://marketplace.digitalocean.com/apps/shinyproxy)

## Open up https port

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
sudo ufw allow https
#sudo ufw allow 9000
```

Finally, enable these rules by running `sudo ufw enable`.
Check `ufw status`.

## Set up domain

This section is based on [this](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04)
post.

For Let's Encript certificate, you need a fully registered domain name.
We use `example.com` domain where you have to substitute you domain name.
Both of the following DNS records need to be set up for your server:

* an `A` record with `example.com` pointing to your server's public IP address,
* an `A` record with `www.example.com` pointing to your server's public IP address.

## Secure Nginx

Add repository for up to date Certbot version:

```bash
sudo add-apt-repository ppa:certbot/certbot
```

You'll need to press ENTER to accept.

Install Certbot's Nginx package with apt:

```bash
sudo apt install python3-certbot-nginx
```

Certbot is now ready to use.

## Configuration

In the `/etc/nginx/sites-available/default` file,
find the line `server_name _;` and change it to
`server_name example.com www.example.com;`.

Next, test to make sure that there are no syntax errors in any of your Nginx files by
`sudo nginx -t`.

If there aren't any problems, restart Nginx to enable your changes by
`sudo systemctl restart nginx`.

There is no need to firewall off port 80, instead pick forwarding when asked by Certbot (option 2).
See [https://letsencrypt.org/docs/allow-port-80/](https://letsencrypt.org/docs/allow-port-80/) for explanation.

## Obtaining an SSL Certificate

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

What if using a subdomain? `subdomain.example.com` is same as `www`.
Be careful with capitalization: browsers might not be case sensitive but
Nginx and Certbot wants things nice and clean and matching DNS settings.

If this is your first time running Certbot, you will be prompted to enter an
email address and agree to the terms of service. After doing so, certbot will
communicate with the Let's Encrypt server, then run a challenge to verify that
you control the domain you are requesting a certificate for.

## Verifying auto-renewal

Run this command for a dry run: `sudo certbot renew --dry-run`.

:::tip Contact us!
Would you like to run your own ShinyProxy server? Reach out to [Analythium](https://analythium.io/contact) if you need commercial support and consulting services!
:::
