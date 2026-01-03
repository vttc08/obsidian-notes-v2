Clone the repository
```bash
git clone ssh://github.com/vttc08/htpc-troubleshooter
```
Deploy to prod
Build Python container
```bash
 docker build -t htpc-troubleshooter .
```
- it will use root `Dockerfile` and build a container called `htpc-troubleshooter`
Build and Prepare hugo static site
```bash
mkdir support
```
- this must be completed because of permission
```bash
docker build --build-arg GH_TOKEN="" --build-arg REPO="github.com/vttc08/htpc-troubleshooter-support"  -t hugo -f hugo.Dockerfile .
```
- uses `hugo.Dockerfile` to build the container which include hugo assets
- container name is `hugo`
Running hugo
```bash
docker run --rm -it --name hugo -v ./support:/static hugo hugo build --baseURL http://10.10.120.16:8001/support -d /static
```
- the `baseURL` has to be changed everything on build, it must match host and port of the Python container, including port bindings
- uses base directory of `/support`, which is used by FastAPI

