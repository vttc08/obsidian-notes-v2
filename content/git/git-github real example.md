Movie Renamer Project
Merge only a specific commit from another branch

`git fetch origin <branch name>` fetch the another branch
`git checkout -B <branch> origin/branch` -B force creation of local branch from remote branch
`git log <branch>` see the commits and its hashes of that branch
`git checkout master`
`git cherry-pick <hash>` pick the commit from another branch and put it in the master branch, fix merge conflicts if needed

## FreeTube
Clone the repo
`git status` the correct one is in development
Add a new branch for your own changes `git checkour -c ryd`
`yarn` to install dependencies
```bash
git remote add patch https://github.com/ChunkyProgrammer/FreeTube
git fetch patch
git rebase patch/add-ryd
```
- resolve everything in the merge editor in VSCode
When FreeTube upstream changes
```bash
git fetch origin # fetch changes from remote repo
git rebase origin/development
```
- merge changes if necessary

## Subcleaner
Refer to [git-submodule](git-submodule.md)
Fork the official [subcleaner](https://github.com/KBlixt/subcleaner)
In the movie-renamer project, add the submodule
```sh
git submodule add https://github.com/vttc08/subcleaner-submodule
```
In the added submodule repo, add the upstream (has to do it on every computer)
```sh
git remote add upstream https://github.com/KBlixt/subcleaner
```
- whenever the upstream made changes (assuming changes pushed to master)
```sh
git fetch upstream
git merge upstream/master
```
