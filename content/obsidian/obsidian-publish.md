---
title: Obsidian Publish
---

**Digital Garden**
Explorer theme works well but options to selfhost is not working.

**Perlite**
Doesn't work with attachment and links unless it's wikilink format.

## Quartz (best option so far)
> [!bug]+ Problems with Quartz
> Explorer require [workarounds](https://github.com/vttc08/obsidian-notes/commit/01f24fbf5da58b2b40724f4cfe121685a9d2acd9).
> Recent Notes feature provide incorrect result.
> Line breaks doesn't work. around lists. Same problem as [mkdocs](../!documentation/mkdocs.md#mkdocs) (Must use `Enter` twice in order for it to showup in Quartz as paragraph with space)
>  - The standard line break can be fixed with [HardLineBreaks](https://quartz.jzhao.xyz/plugins/HardLineBreaks) plugin but when transition between list and paragraph, it will not work
>  
> ~~`npx` problem cannot be terminated hence not useable with [obsidian-shell](obsidian-shell.md)~~ 
> Can use a obsidian shell command to start/stop the server manually, but since `npx` is ongoing process it may require more work to open the browser afterward.
> 

### Setup
https://quartz.jzhao.xyz/
Install Node and npm of the correct version
```js
npm install
npx quartz create
```
Create a github repo and set the local files to point to that
```bash
git remote rm origin
git remote add origin your-github
```
Then `npx quartz sync --no-pull`
### Configuration
All the markdown files are located in `content`
`quartz.config.ts`
- may need to change the markdown link resolution to `relative`
- when using ignore patterns on path with special character, warp it in `()`
```ts
ignorePatterns: ["private", "templates", ".obsidian", "(!documentation)"],
```
- the same has to be done to `.gitignore` as well
	- to escape special characters use `\`

To get the explorer to show up on mobile there are special workarounds.
- the explorer will  show up on `index` or the title named `Digital Garden` as content and on both mobile and desktop view
- In mobile view, there is a button on the top right that links to the index page
- https://github.com/vttc08/obsidian-notes/commit/01f24fbf5da58b2b40724f4cfe121685a9d2acd9 This commit has all the details.
- 
Other cosmetic changes will be tracked in https://github.com/vttc08/obsidian-notes
- explorer click link to open instead of collapse
- On desktop view, the right sidebar has the order Backlinks, ToC, Graph
- On mobile view, ToC on `before-body`

### Selfhosting
#### Nginx
In order for nginx to work, custom configuration to rewrite the path is needed
```yaml
    volumes:
      - ~/docker/quartz-web/site:/usr/share/nginx/html
      - ./nginx.conf:/etc/nginx/nginx.conf
```
```nginx
  http {
      include mime.types;
      sendfile on;
      set_real_ip_from 10.10.120.0/24;
      real_ip_header X-Forwarded-For;

      server {
          listen       80;
          listen  [::]:80;
          server_name  localhost;


          location / {
              try_files $uri $uri.html $uri/ =404;
              root   /usr/share/nginx/html;
              index  index.html index.htm;
          }
      }
  }
```
- the following fix 404 error caused by default nginx configuration
- need to append it to the original nginx configuration and replace the `http` part
#### Caddy
Following the basic syntax at [caddy](../!documentation/Docker%20Apps/Web/caddy.md)
```json
        @dg host dg.{$WEBSITE}
        handle @dg {
                root * /www
                file_server
                encode gzip
                try_files {path} {path}.html {path}/ =404
        }
```
- the `try_files` is necessary to handle the static files otherwise 404 occurs
### Integrating with Obsidian
After making change in native Obsidian
- Live preview if applicable ~~(Live preview is impossible because [obsidian-shell](obsidian-shell.md) cannot terminate `npx`)~~
- Copy generated html to home server (powershell script)
- Update git repo and [Github actions](https://quartz.jzhao.xyz/hosting#github-pages)
Dev server for preview on `localhost:8080`, after preview, the server needs to be terminated manually
```javascript
npx quartz build --serve -d ..\..\VSCode\notes\
```
Update to Github with commit
```js
npx quartz sync -m "commit message"
```
Refer to [obsidian-shell](obsidian-shell.md) for powershell workflows

Command to add to obsidian shell
```powershell
sleep 0.5
$dg = [Environment]::GetFolderPath("MyDocuments") + "\Projects\obsidian-publish"
function cpy{
  param ($src, $dest, $opt)
  robocopy $src $dest /E /NDL /NJH /XF *.py *.ipynb $opt
}
cpy . "$dg\content"
cd $dg
npx quartz build
cpy public/ "\\10.10.120.12\docker\quartz-web\site" /NFL
if (${{_github}}) { 
  npx quartz sync -m "${{_commit}}"
  echo "Published to github."
} else { echo "Process is done." }
```
- the command has been updated to ignore non-markdown files such as python notebooks
Another command to start/stop live preview server.
```powershell
sleep 0.5
$dg = [Environment]::GetFolderPath("MyDocuments") + "\Projects\obsidian-publish"
cd $dg

function bg() {start @args}
if (${{_dev}}) { 
  npx quartz build --serve -d ..\..\VSCode\notes\  
  bg "http://localhost:8080"
} else { 
  $processPID =  $($(netstat -aon | findstr "8080")[0] -split '\s+')[-1]
  taskkill /f /pid $processPID
}
```

Current implementation
Issues
- complex powershell wrapper script
- requiring a dedicated environment for publishing (npm, git, powershell, paths)
	- makes the publishing tied to a specific desktop Windows computer
	- difficult to setup on a new one
- quartz is not updated
- due to how syncing works, the last updated doesn't show

New proposed solutions
- environment setup on server side (same server running obsidian-webtop and quartz-web)
- unify publishing on the server (that runs obsidian-webtop) instead of clients
	- uses Docker for building and publishing HTML and CI/CD
	- [optional] uses obsidian-shell and SSH (into the server), run Docker build
	- uses bash wrapped in SSH command so it runs on both Windows and Linux
- uncouple obsidian shell with publish (Docker/SSH), makes it possible to control on mobile, new PC too, as long as it can access the server SSH

Todos
- [x] Quartz MVP working in WSL (same environment as server)
~~- uses current notes~~
~~- check for compatibility issues and everything works~~
~~- both mobile and desktop view~~
- [x] ignoring specific content, both git and quartz ignore
- using both git and quartz
- [x] explorer
- it's no longer possible to have a explorer on the homepage
- [x] recent notes by date
- [x] upstream and own notes
- [ ] rsync script
- [ ] build and publish script
- [ ] docker
- [ ] obsidian-shell (SSH)

Download nodejs
https://nodejs.org/en/download
Install dependencies
https://quartz.jzhao.xyz/

Changes made
- colors
- list spacing (custom plugin), obsidian line breaks
- ignore notes

If markdown is deleted, then using quartz build command is fine.
https://github.com/adoyle-h/quartz
This patch is necessary for the Docker build to work without errors

rsync command
```bash
rsync -avhP --delete content/ markdown/
```

The WebSocket port must be defined by environment variable, not port mapping  

The default way of deploying via Github pages doesn't preserve the date, as it's being tracked by filesystem. Therefore `ghp-import` was used to publish the raw HTML content directly to Github.

Deployment via SSH, obsidian-shell is now working.