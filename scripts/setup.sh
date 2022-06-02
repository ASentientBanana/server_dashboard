#!/usr/bin/bash 

[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"

project_dir_scripts=$(pwd)
project_dir=$(cd .. && pwd)
server_deployment_path='/var/www/server/'
sites_available_path='/etc/nginx/sites-available'
sites_enabled_path='/etc/nginx/sites-enabled'
dashboard_port=3534
packages='nginx'
config_keyword_set=('&server_name' '&server_port')
installcmd=' apt install'
number_of_options=3


echo "Enter username:"
read username
echo "Enter password:"
read password

echo "Select ditribution: "
echo "[1] Ubuntu/Debian: "
echo "[2] Fedora/REL:"
echo "[3] Arch/Manjaro: "

read distro

[ "$distro" -gt "$number_of_options" ] ||
[ "$distro" -eq "0" ] && 
echo "Invalid choice" &&
exit 1


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

[ $distro -eq 1 ] && installcmd='apt install ' 
[ $distro -eq 2 ] && installcmd='dnf install ' 
[ $distro -eq 3 ] && installcmd='pacman -S ' 
[ $distro -gt 3 ] && echo "User input error $distro not valid input" && exit 1

echo "Installing nvm..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm install 16

echo "Creating database file"
touch $project_dir/db.sqlite


nvm use 16


node $project_dir/scripts/database/setup.js && node $project_dir/scripts/database/register.js $username $password


# echo $RANDOM | md5sum | head -c 20; echo;

echo "Installing packages..."
$installcmd $packages
systemctl enable nginx.service && systemctl start nginx.service

echo "Installing node modules..."
yarn --cwd $project_dir install
echo "Creating build..."
yarn --cwd $project_dir build

echo 'Creating server directory...'
echo 'Path: '$server_deployment_path
mkdir -p $server_deployment_path

echo 'Creating server nginx server config...'
mkdir -p $sites_available_path
mkdir -p $sites_enabled_path
echo 'Adding to sites available...'

site_path=$sites_available_path'/'dashboard
cp ../templates/nginx-template $site_path

for n in {0,1}; do 
 sed -i -e 's/'${config_keyword_set[$n]}'/'${config_value_set[$n]}'/g' $site_path;
done;

echo 'Creating symlink...'
ln -s $site_path $sites_enabled_path'/'dashboard

systemctl restart nginx.service

echo 'Site enabled'
exit 0

