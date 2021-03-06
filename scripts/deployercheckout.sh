#!/bin/bash
# This script is responsible for pulling and syncing up the git repo
# with the make files. Passed in variable can be a specific branch or tag.
SCRIPTPATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPOPATH=$SCRIPTPATH"/../stanford-jumpstart-deployer"
GITREMOTE="git@github.com:SU-SWS/stanford-jumpstart-deployer.git"
GITREMOTENAME="origin"
GITBRANCH="7.x-5.x"

if [ ! -z "$1" ]; then
  GITBRANCH=$1
fi

GITCHECKOUT=$GITBRANCH

if [ ! -d $REPOPATH ]; then
  git clone $GITREMOTE $REPOPATH
fi

cd $REPOPATH

# Store any changes to the dirty branch if there are any.
MSG=$(git stash save "Auto-stash by Geppetto script")
NON="No local changes to save"

git fetch $GITREMOTENAME
git fetch $GITREMOTENAME --tags
git pull --rebase
git checkout $GITCHECKOUT --quiet

if [[ "$MSG" != "$NON" ]]; then
  git stash pop --quiet
fi
