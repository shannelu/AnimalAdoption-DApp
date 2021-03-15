# Git instructions for our team

## create branch
### create your new local dev branch and switch to it
> git checkout -b dev_name

### push this new branch to remote
> git push origin dev_name:dev_name

### delete remote branch
> git push origin :dev_name 

or

> git push origin --delete dev_name

## merge your remote dev branch to remote main
### switch to local main
> git checkout main

### merge local dev branch to local main **(check for conflicts!)**
> git merge dev_name

### push
> git push origin main