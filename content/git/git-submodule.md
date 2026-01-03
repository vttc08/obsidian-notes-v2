Git repo inside another.
Make every command submodule aware
```sh
git config submodule.recurse true
```

Add 
```sh
git submodule add <url>
```
Clone a project with submodule
```sh
git clone <url> --recurse-submodule
```
Update changes from submodule after pulling from repository
```sh
git submodule update --init
```
Rename a submodule locally
```sh
git mv <submodule> <subnew>
```
Remove a submodule
```sh
git submodule deinit <path_to_submodule>  
git rm <path_to_submodule>  
git commit-m ""  
rm -rf .git/modules/<path_to_submodule>
```

**Submodule Repo**
The `git` command will work at the current directory, if it in the submodule directory, then that repo will be modified. In the submodule repo, commit and push everything normally.

**Main Repo**
The main repo only stores the submodule information and commit hashes. This is the information needed to identify the submodule and the contents.
Every time when a commit/push occurs in the submodule, the main repo also needs to be updated.
- it will update `.gitmodules` file with the new commit hash
- the changes will be reflected on the main repo by `git pull` and `git submodule update`