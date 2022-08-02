#!/usr/bin/bash 

#args: repo locaton
repo=$1
locaton=$2
git clone $repo $locaton
echo "git clone" $repo $locaton
