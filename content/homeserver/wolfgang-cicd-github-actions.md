https://youtu.be/ATenAnk8eX4
Assuming we have a site of html files at `/var/www/html` owned by `www-data` group
Add a user with the home directory to the website
```shell
sudo useradd -G www-data deploy -m -d /var/www/html
```

**Generate SSH keys**
On the local machine
```shell
ssh-keygen -t ed25519 ~/.ssh/deploy
```
On the remote machine in the user's home folder
```shell
sudo mkdir -p .ssh
```
Copy the key into authorized keys
```shell
echo "ssh-ed25519 KEYKEYKEY" | sudo tee authorized_keys
sudo chown -R $USER:$GROUP ~
sudo chmod 700 ~/ssh
sudo chmod 500 ~/ssh/authorized_keys
```
- this creates adds the public key (previously generated) to `authorized_keys`
- the user should own the ssh folder
- the ssh folder should have 700 permission and the `authroized_keys` file should have 500

**Github Action**
Make a folder in the root directory `.github/workflows` and add `workflow.yml`

Action definition, run on push
```yaml
name: CI
run-name: Zola blog deployment
on:
  push # job will run on push to github

jobs:
  build:
    runs-on: ubuntu-latest
    environment: deploy
    steps:
      - name: Checkout the current branch
        uses: actions/checkout@v3 # checkout the repo

      - name: Initialize the ssh-agent # configure ssh private key
        uses: webfactory/ssh-agent@v0.4.1
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

# zola setup part
      - name: Install Zola
        run: sudo snap install zola --edge

      - name: Build the website
        run: zola build # any command will be executed in the root of project repo

# SSH keyscan to avoid error
      - name: Scan the host key
        run: mkdir -p ~/.ssh/ && ssh-keyscan -H $DEPLOY_SERVER >> ~/.ssh/known_hosts
        env:
          DEPLOY_SERVER: ${{ secrets.DEPLOY_SERVER }}

# Runs the rsync command to the remote site
      - name: Deploy the website
        run: >-
          rsync -avx --delete --exclude '.ssh' public/ $DEPLOY_USERNAME@$DEPLOY_SERVER:./
        env:
          DEPLOY_SERVER: ${{ secrets.DEPLOY_SERVER }}
          DEPLOY_USERNAME: ${{ secrets.DEPLOY_USERNAME }}
```