Github secrets are created in the repository settings. Go to Settings > Secrets and variables > Actions to create a secret.

This is the workflow to sync secrets with multiple repositories. The secrets are stored in a private repository called [git-tutorial](https://github.com/vttc08/git-tutorial). To add a global secret, go to this [link](https://github.com/vttc08/git-tutorial/settings/secrets/actions).

The action created by [cbrgm/sync-secrets-action@v1](https://github.com/marketplace/actions/sync-secrets-action)will be able to sync secrets between repos, but the process is still somewhat manual.

On brand new setup, need to create a GitHub token. Go to this [link](https://github.com/settings/tokens) and create a new token with the following permissions:
- repo (select all)

In the repo containing all the secrets create a workflow at `.github/workflows/' with 

```yaml
name: Sync Secrets Across Repositories and Environments

on:
  workflow_dispatch:
  push:

jobs:
  sync-secrets:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        repo: ['vttc08/test-symlink', 'vttc08/websitewecreatedatmidnight'] # Target repositories
    steps:
      - name: Sync Secrets to ${{ matrix.repo }} 
        uses: cbrgm/sync-secrets-action@v1
        with:
          github-token: ${{ secrets.GH_TOKEN }}
          target: ${{ matrix.repo }}
          secrets: |
            SERVER_IP=${{ secrets.SERVER_IP }}
            SERVER_PORT=${{ secrets.SERVER_PORT }}
            USERNAME=${{ secrets.USERNAME }}
          type: 'actions'
          dry-run: 'false'
```
- to add a repo to be synced, add it under `strategy[matrix][repo]`
- the Github secret is stored in `${{ secrets.GH_TOKEN }}`
- to add a secret to be synced, follow the template above `USERNAME=${{ secrets.USERNAME }}`
- commit the changes, if this action is edited under Github default editor, it will run after every modification

**the repo above does not work with secrets that are multiline such as private key**
[this action](https://github.com/marketplace/actions/secrets-sync) should work
`.github/workflows/action.yml`
```yaml
name: Another Github Actions Secret Sync 

on:
  workflow_dispatch:
    inputs:
      filter_repos:
        description: "Comma separated list of repos that should be processed"
        required: false
      filter_secrets:
        description: "Comma separated list of secrets that should be processed"
        required: false
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repo
        uses: actions/checkout@v2 
      - name: Sync secrets
        uses: xt0rted/secrets-sync@v1
        with:
          repo_token: ${{ secrets.GH_TOKEN }}
          filter_repos: ${{ github.event.inputs.filter_repos }}
          filter_secrets: ${{ github.event.inputs.filter_secrets }}
        env:
          ORACLE_YUL_KEY: ${{ secrets.ORACLE_YUL_KEY }}
```
Also need to configure `secrets-sync.yml` in the root folder of the repo, the secret sync is completely manual
```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/xt0rted/secrets-sync/main/settings.schema.json
defaults:
  actions: true
  dependabot: true
secrets:
  - name: ORACLE_YUL_KEY
    value: env/ORACLE_YUL_KEY
    repos:
      - vttc08/infra-docs
```