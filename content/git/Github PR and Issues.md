Any user can create an issue on Github.
There are 2 ways to resolve a issue using pull requests ^8ba941
##### Github Manual Way
- create a new branch `git checkout fix-issue`
- make the changes while in that branch
- once the branch is done, publish the branch `git push`
- Github will ask option to create a pull request
- Edit the merge branches accordingly
![](assets/Pasted%20image%2020240321021513.png)
- complete the merge and PR with a comment `close #1` where the issue is #1
- delete the branch
- for local removal do `git branch -D fix-issue`

##### Github Auto Branch
![](assets/Pasted%20image%2020240321021741.png)
- under the issues, Github will automatically create a branch; however, the branch will be based on changes in master branch
- checkout the branch following github's instructions
```bash
git fetch origin
git checkout the-branch-name
```
- tip: make sure to not include `origin/the-branch-name` in the checkout

![](assets/Pasted%20image%2020240408011210.png)
- Once the PR is pushed to github, `compare and pull request`, fill in the appropriate info, closing is the same as the manual way  [Github Manual Way](Github%20PR%20and%20Issues.md#Github%20Manual%20Way)