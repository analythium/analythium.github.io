(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{163:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return s}));var a=n(2),r=n(9),o=(n(0),n(177)),i={id:"shinyproxy-secure",title:"Secure ShinyProxy"},c={id:"shinyproxy-secure",title:"Secure ShinyProxy",description:"This document guides you through TLS setup for ShinyProxy 1-click app",source:"@site/docs/shinyproxy-secure.md",permalink:"/docs/shinyproxy-secure",editUrl:"https://github.com/analythium/analythium.github.io/edit/source/docs/shinyproxy-secure.md",lastUpdatedBy:"Peter Solymos",lastUpdatedAt:1626793154,sidebar:"docs",previous:{title:"Set Up ShinyProxy",permalink:"/docs/shinyproxy-setup"},next:{title:"Update ShinyProxy",permalink:"/docs/shinyproxy-update"}},l=[{value:"Open up https port",id:"open-up-https-port",children:[]},{value:"Set up domain",id:"set-up-domain",children:[]},{value:"Secure Nginx",id:"secure-nginx",children:[]},{value:"Configuration",id:"configuration",children:[]},{value:"Obtaining an SSL Certificate",id:"obtaining-an-ssl-certificate",children:[]},{value:"Verifying auto-renewal",id:"verifying-auto-renewal",children:[]}],p={rightToc:l};function s(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://hosting.analythium.io/"}),Object(o.b)("img",Object(a.a)({parentName:"a"},{src:"https://hub.analythium.io/assets/marks/hosting-banner-2.jpg",alt:"Hosting Data Apps"})))),Object(o.b)("p",null,"This document guides you through TLS setup for ShinyProxy 1-click app"),Object(o.b)("p",null,Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://marketplace.digitalocean.com/apps/shinyproxy?refcode=a8041699739d"}),Object(o.b)("img",Object(a.a)({parentName:"a"},{src:"https://raw.githubusercontent.com/analythium/shinyproxy-1-click/master/digitalocean/images/do-btn-blue.svg",alt:"DO button"})))),Object(o.b)("h2",{id:"open-up-https-port"},"Open up https port"),Object(o.b)("p",null,"UFW is an Uncomplicated Firewall.\nWe enables the UFW firewall to allow only SSH, HTTP and HTTPS.\nSee a detailed tutorial ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-20-04"}),"here"),".\nSettings we did ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"shinyproxy-setup"}),"previously")," are commented out, uncomment\nas needed."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"#sudo apt install ufw\n\n#sudo ufw default deny incoming\n#sudo ufw default allow outgoing\n\n#sudo ufw allow ssh\n#sudo ufw allow http\nsudo ufw allow https\n#sudo ufw allow 9000\n")),Object(o.b)("p",null,"Finally, enable these rules by running ",Object(o.b)("inlineCode",{parentName:"p"},"sudo ufw enable"),".\nCheck ",Object(o.b)("inlineCode",{parentName:"p"},"ufw status"),"."),Object(o.b)("h2",{id:"set-up-domain"},"Set up domain"),Object(o.b)("p",null,"This section is based on ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04"}),"this"),"\npost."),Object(o.b)("p",null,"For Let's Encript certificate, you need a fully registered domain name.\nWe use ",Object(o.b)("inlineCode",{parentName:"p"},"example.com")," domain where you have to substitute you domain name.\nBoth of the following DNS records need to be set up for your server:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"an ",Object(o.b)("inlineCode",{parentName:"li"},"A")," record with ",Object(o.b)("inlineCode",{parentName:"li"},"example.com")," pointing to your server's public IP address,"),Object(o.b)("li",{parentName:"ul"},"an ",Object(o.b)("inlineCode",{parentName:"li"},"A")," record with ",Object(o.b)("inlineCode",{parentName:"li"},"www.example.com")," pointing to your server's public IP address.")),Object(o.b)("h2",{id:"secure-nginx"},"Secure Nginx"),Object(o.b)("p",null,"Add repository for up to date Certbot version:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"sudo add-apt-repository ppa:certbot/certbot\n")),Object(o.b)("p",null,"You'll need to press ENTER to accept."),Object(o.b)("p",null,"Install Certbot's Nginx package with apt:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"sudo apt install python3-certbot-nginx\n")),Object(o.b)("p",null,"Certbot is now ready to use."),Object(o.b)("h2",{id:"configuration"},"Configuration"),Object(o.b)("p",null,"In the ",Object(o.b)("inlineCode",{parentName:"p"},"/etc/nginx/sites-available/default")," file,\nfind the line ",Object(o.b)("inlineCode",{parentName:"p"},"server_name _;")," and change it to\n",Object(o.b)("inlineCode",{parentName:"p"},"server_name example.com www.example.com;"),"."),Object(o.b)("p",null,"Next, test to make sure that there are no syntax errors in any of your Nginx files by\n",Object(o.b)("inlineCode",{parentName:"p"},"sudo nginx -t"),"."),Object(o.b)("p",null,"If there aren't any problems, restart Nginx to enable your changes by\n",Object(o.b)("inlineCode",{parentName:"p"},"sudo systemctl restart nginx"),"."),Object(o.b)("p",null,"There is no need to firewall off port 80, instead pick forwarding when asked by Certbot (option 2).\nSee ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://letsencrypt.org/docs/allow-port-80/"}),"https://letsencrypt.org/docs/allow-port-80/")," for explanation."),Object(o.b)("h2",{id:"obtaining-an-ssl-certificate"},"Obtaining an SSL Certificate"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"sudo certbot --nginx -d example.com -d www.example.com\n")),Object(o.b)("p",null,"What if using a subdomain? ",Object(o.b)("inlineCode",{parentName:"p"},"subdomain.example.com")," is same as ",Object(o.b)("inlineCode",{parentName:"p"},"www"),".\nBe careful with capitalization: browsers might not be case sensitive but\nNginx and Certbot wants things nice and clean and matching DNS settings."),Object(o.b)("p",null,"If this is your first time running Certbot, you will be prompted to enter an\nemail address and agree to the terms of service. After doing so, certbot will\ncommunicate with the Let's Encrypt server, then run a challenge to verify that\nyou control the domain you are requesting a certificate for."),Object(o.b)("h2",{id:"verifying-auto-renewal"},"Verifying auto-renewal"),Object(o.b)("p",null,"Run this command for a dry run: ",Object(o.b)("inlineCode",{parentName:"p"},"sudo certbot renew --dry-run"),"."),Object(o.b)("p",null,Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://hosting.analythium.io/"}),Object(o.b)("img",Object(a.a)({parentName:"a"},{src:"https://hub.analythium.io/assets/marks/hosting-banner-2.jpg",alt:"Hosting Data Apps"})))))}s.isMDXComponent=!0},177:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=r.a.createContext({}),s=function(e){var t=r.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=s(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(n),d=a,m=u["".concat(i,".").concat(d)]||u[d]||b[d]||o;return n?r.a.createElement(m,c(c({ref:t},p),{},{components:n})):r.a.createElement(m,c({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var p=2;p<o;p++)i[p]=n[p];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);