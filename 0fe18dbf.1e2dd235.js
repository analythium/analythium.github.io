(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{135:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return s}));var a=n(2),i=n(9),r=(n(0),n(174)),o={id:"shinyproxy-update",title:"Update ShinyProxy"},c={id:"shinyproxy-update",title:"Update ShinyProxy",description:"Once your ShinyProxy server is up and running, you need to maintain and update it.",source:"@site/docs/shinyproxy-update.md",permalink:"/docs/shinyproxy-update",editUrl:"https://github.com/analythium/analythium.github.io/edit/source/docs/shinyproxy-update.md",lastUpdatedBy:"Peter Solymos",lastUpdatedAt:1617948048,sidebar:"docs",previous:{title:"Secure ShinyProxy",permalink:"/docs/shinyproxy-secure"},next:{title:"CI/CD with Webhook",permalink:"/docs/shinyproxy-webhook"}},l=[{value:"Edit configuration",id:"edit-configuration",children:[]},{value:"Docker login",id:"docker-login",children:[]},{value:"Update script",id:"update-script",children:[]},{value:"Cron",id:"cron",children:[]}],p={rightToc:l};function s(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Once your ShinyProxy server is up and running, you need to maintain and update it.\nThis section explains how to update existing apps and how to add new ones hassle free."),Object(r.b)("p",null,Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://marketplace.digitalocean.com/apps/shinyproxy?refcode=a8041699739d"}),Object(r.b)("img",Object(a.a)({parentName:"a"},{src:"https://raw.githubusercontent.com/analythium/shinyproxy-1-click/master/digitalocean/images/do-btn-blue.svg",alt:"DO button"})))),Object(r.b)("h2",{id:"edit-configuration"},"Edit configuration"),Object(r.b)("p",null,"Create and ",Object(r.b)("inlineCode",{parentName:"p"},"application.yml")," file or use the file in the ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"shinyproxy-setup"}),"previous")," section as a starting point. The file is also available ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/analythium/shinyproxy-1-click/blob/master/digitalocean/application.yml"}),"here"),"."),Object(r.b)("p",null,"The most important part is adding apps:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-vim"}),'  - id: 02_hello\n    display-name: Demo Shiny App\n    description: App with sliders and large file upload\n    container-cmd: ["R", "-e", "shiny::runApp(\'/root/app\')"]\n    container-image: analythium/shinyproxy-demo:latest\n    logo-url: https://github.com/analythium/shinyproxy-1-click/raw/master/digitalocean/images/app-dots.png\n    access-groups: [admins]\n')),Object(r.b)("p",null,"The keys for the apps are the following (see the official ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.shinyproxy.io/documentation/configuration/#apps"}),"docs"),"). The three most important ones are:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"id"),": the identifier of the application, this will also be part of the path to the app"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"container-cmd"),": the command that will be run when the Docker container is launched"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"container-image"),": name of the docker image to be started for every new user of this app")),Object(r.b)("p",null,"The Docker images need to be pulled beforehand. If you are using private images, ",Object(r.b)("inlineCode",{parentName:"p"},"docker login")," will also be required before pulling images."),Object(r.b)("h2",{id:"docker-login"},"Docker login"),Object(r.b)("p",null,"This step is optional if private registry access is needed for pulling Docker images."),Object(r.b)("p",null,"Log into your droplet via ssh and lig into your registry via ",Object(r.b)("inlineCode",{parentName:"p"},"docker login"),"\n(Docker Hub by default, use ",Object(r.b)("inlineCode",{parentName:"p"},"docker login registry.gitlab.com")," for the GitLab\ncontainer registry). You will be asked to authenticate interactively\nand your personal access token will be saved on the droplet for future use."),Object(r.b)("h2",{id:"update-script"},"Update script"),Object(r.b)("p",null,"Once your ",Object(r.b)("inlineCode",{parentName:"p"},"application.yml")," is ready, ",Object(r.b)("inlineCode",{parentName:"p"},"cd")," into the directory where the configuration file is located and download the following ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/analythium/shinyproxy-1-click/blob/master/digitalocean/setup.sh"}),"script file"),":"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"wget -O ./update.sh https://raw.githubusercontent.com/analythium/shinyproxy-1-click/master/digitalocean/setup.sh\n")),Object(r.b)("p",null,"Use the ",Object(r.b)("inlineCode",{parentName:"p"},"setup.sh")," as:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"bash setup.sh -i ~/.ssh/id_rsa -s root@ip_address -f application.yml\n")),Object(r.b)("p",null,"The following command line arguments need to be passed to the ",Object(r.b)("inlineCode",{parentName:"p"},"setup.sh")," script:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"-i"),": path to your ssh key,"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"-s"),": user name (root for DigitalOcean droplets) and the IP address: ",Object(r.b)("inlineCode",{parentName:"li"},"user@ip_address"),","),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"-f"),": path and file name to the yml with the ShinyProxy config, e.g. ",Object(r.b)("inlineCode",{parentName:"li"},"/path/to/application-new.yml"),".")),Object(r.b)("p",null,"The script then takes care of the rest:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"Copies the ",Object(r.b)("inlineCode",{parentName:"li"},"application.yml")," to the droplet,"),Object(r.b)("li",{parentName:"ol"},"pulls the Docker images listed in the ",Object(r.b)("inlineCode",{parentName:"li"},"application.yml")," file: updates the ones already pulled before, and the ones newly added too,"),Object(r.b)("li",{parentName:"ol"},"and restarts the ShinyProxy and Docker services.")),Object(r.b)("h2",{id:"cron"},"Cron"),Object(r.b)("p",null,"If the config file is not changing (i.e. no new apps added), you can set up cron job to regularly update the images that are already pulled to the server."),Object(r.b)("p",null,"We have access to the cron utility: run ",Object(r.b)("inlineCode",{parentName:"p"},"crontab -e"),",\npick an editor (nano) if you haven't done so already and then add\nthese lines to the bottom and save it:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"# Cleanup at 3:00am every Sunday\n0 3 * * 0 docker system prune -f\n\n# Update all images at 1:00am every day\n0 1 * * * docker images |grep -v REPOSITORY|awk '{print $1\":\"$2}'|xargs -L1 docker pull\n")),Object(r.b)("p",null,"The cleanup command removes dangling (not needed) images that take up unnecessary space."),Object(r.b)("p",null,"The second command updates all the images that are already present."),Object(r.b)("p",null,"Check settings using ",Object(r.b)("inlineCode",{parentName:"p"},"crontab -l"),"."),Object(r.b)("p",null,"Cron jobs represent a polling type of update, which means we are regularly checking for updates. However, if changes to the images are infrequent, there is no need for constant polling. Setting cron intervals too large might lead to missing important updates."),Object(r.b)("p",null,Object(r.b)("img",Object(a.a)({parentName:"p"},{src:"../../img/shinyproxy/webhook.png",alt:"API polling vs webhook",title:"API polling vs webhook"}))),Object(r.b)("p",null,"Webhooks in general are ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://blog.cloud-elements.com/webhooks-vs-polling-youre-better-than-this"}),"considered a better alternative to polling"),", although webhooks require a bit more work. The next section will explain how to do it."),Object(r.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(r.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(r.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(r.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"Further reading")),Object(r.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(r.b)("ul",{parentName:"div"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"https://www.digitalocean.com/community/tutorials/how-to-use-cron-to-automate-tasks-ubuntu-1804"}),"Cron guide"))))),Object(r.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(r.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(r.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"}),Object(r.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})))),"Contact us!")),Object(r.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(r.b)("p",{parentName:"div"},"Would you like to run your own ShinyProxy server? Reach out to ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://analythium.io/contact"}),"Analythium")," if you need commercial support and consulting services!"))))}s.isMDXComponent=!0},174:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return h}));var a=n(0),i=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=i.a.createContext({}),s=function(e){var t=i.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},b=function(e){var t=s(e.components);return i.a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},u=i.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,o=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),b=s(n),u=a,h=b["".concat(o,".").concat(u)]||b[u]||d[u]||r;return n?i.a.createElement(h,c(c({ref:t},p),{},{components:n})):i.a.createElement(h,c({ref:t},p))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var p=2;p<r;p++)o[p]=n[p];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);