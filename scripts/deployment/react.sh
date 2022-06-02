#!/usr/bin/bash 

#args: repo location package_manager   

repo=$1
locaiton=$2
package_manager=$3

git clone $repo:$location

installcmd=$package_manager 
[ $3 -eq npm ] &&  npm --prefix $location install  
[ $3 -eq yarn ] && yarn --cwd $location  install

