#! /usr/bin/env bash

project_dir_scripts=$(pwd)
server_deployment_path='/var/www/server/'
sites_available_path='/etc/nginx/sites-available'
sites_enabled_path='/etc/nginx/sites-enabled'
dashboard_port=3534
packages='nginx'
config_keyword_set=('&server_name' '&server_port')
installcmd=' apt isntall'


echo "Select ditribution: "
echo "[1] Ubuntu/Debian: "
echo "[2] Fedora/REL:"
echo "[3] Arch/Manjaro: "

read distro


echo 'Enter domain name eg. google.com, api.sitename.com'
read domain_name

[ -z "$domain_name" ] && 
echo "Error:: Domain name required!" &&
exit 1 

echo "Domain name: $domain_name"

echo 'Enter for the dashboard, default 3534'
read dashboard_port_input

[ -z "$dashboard_port_input" ] &&
    echo 'Port set to 3534' ||
    echo 'Port set to '$dashboard_port_input &&
    dashboard_port=$dashboard_port_input

config_value_set=($domain_name $dashboard_port)

[ $distro -eq 1 ] && installcmd=' apt isntall ' ||
[ $distro -eq 2 ] && installcmd=' dnf install ' ||
[ $distro -eq 3 ] && installcmd=' pacman -S ' ||
[ $distro -gt 3 ] && echo "User input error $distro not valid input" && exit 1

$installcmd $packages
#  systemctl enable nginx.service &&  systemctl start nginx.service

cd .. && yarn && yarn build 

cd project_dir_scripts
echo 'Current Dir 'pwd

echo 'Creating server directory...'
echo 'Path: '$server_deployment_path

echo 'Creating server nginx server config'
 mkdir $sites_available_path
 mkdir $sites_enabled_path
echo 'Adding to sites available'

site_path=$sites_available_path'/'dashboard
 cp ./nginx-template $site_path

for n in {0,1}; do 
 sed -i -e 's/'${config_keyword_set[$n]}'/'${config_value_set[$n]}'/g' $site_path;
done;

echo 'Creating symlink...'
 ln -s $site_path $sites_enabled_path'/'dashboard

echo 'Site enabled'
exit 0