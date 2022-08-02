import getConfig from "next/config"

const PATHS = {
  SITES_AVAILABLE: '/etc/nginx/sites-available/',
  SITES_ENABLED: '/etc/nginx/sites-enabled/',
  DEFAULT_SERVER_DIR: '/var/www/server/',
  DEFAULT_STATIC_PROJECT_DIR: '/var/www/server/',
  DEPLOYMENT_SCRIPTS_PATH: (type: string) => `${type}`
}

export default PATHS
