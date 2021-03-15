# Our team use different branches to create each other's own workspace and keep the main branch clean.

## create a new local branch and switch to it
> git checkout -b your_name

## push this new branch to remote
> git push origin your_name:your_name

## delete remote branch
> git push origin :remote_branch_name 
or
> git push origin --delete remote_branch_name