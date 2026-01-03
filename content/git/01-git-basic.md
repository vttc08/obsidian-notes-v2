Config
`git config --global user.name "Kevin Hu"`
`git config --global user.email "Kevin Hu"`
`git config --global core.editor 'code --wait`
use VSCode to edit git configs

`git init` initialize a git repo

**Git ignore**
.gitignore file
add any file or folder, folders have a / to the end
```
.env
.vscode/
node_modules
__pycache__
```
Global ignore file
	`git config --global core.excludesfile ~/.gitignore`
Git alias
`git config --global alias.logg 'log --oneline'`

**Git Environments**
**Working**
**Staging** - a temporary location to store file or later use
`git add -A` or `git add .`
**Commit**
`git commig -m "any message"`

```sh
commit 5a3f2b9f72c8b788298e2340d4f2cd917e947646 (HEAD -> master)
Author: Kevin Hu <hukevin69@gmail.com>
Date:   Sat Dec 16 15:42:35 2023 -0700

    first commit
```

The commit shows the hash and what branch is it `head -> master`

**File state**
Tracked - existed in the previous commit
- unmodified
- modified
- staged - moved in the staging environment
Untracked - file that is not added to version control

`git status` check the status of file
When we modify a file, the state become modified, it is not staged for commit
```
Changes not staged for commit:
        modified:   main.py
```
- use `git add` to move the file into staging
- `git restore --staged` restore the changes made to staging
- once it's not staged, `git restore` restore the modification

Now add a new file, the git does nothing since it doesn't modify untracked files

**Deleting File**
- delete from filesystem, it is recorded in git, need to use git add to add it to staging
- `git rm --cached` remove the file from git staging but keep the file in filesystem
- after committing, then using `git rm` to delete a file, the deletion is tracked as a change to staging, use `git restore` to undo deletion

**Rename**
- renaming it in filesystem cause 2 changes, deleting the original file and creating the renamed file
- `git mv` is used for renaming file `renamed:    module.py -> func.py`
- git is always comparing the changes to the last commit, if there are any changes between last commit and now

**Differences**
`git diff` shows the difference, or can show the difference among other commits

`git log --oneline` put the git logs in one line

`git amend` allow very small staged changes to be added to the last commit
- when editing a small line of code or to edit a commit message
- use `git commit --ammend -m "small change"` and the staged changes will be added along with previous commit
- `git commit --amend --no-edit`

