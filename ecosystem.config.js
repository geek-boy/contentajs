module.exports = {
  apps: [
    {
      name: 'contentajs',
      script: 'lib/server.js',

      // Options reference: https://pm2.io/docs/runtime/reference/ecosystem-file/
      port: 3000,
      instances: '1',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_staging: {
        NODE_ENV: 'staging',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'rpi_doorbell',
      script: 'bin/www',
      cwd: '/home/markc/Projects/rpi_doorbell_github',
      // Options reference: https://pm2.io/docs/runtime/reference/ecosystem-file/
      port: 3002,
      instances: '1',
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_staging: {
        NODE_ENV: 'staging',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  // Use pm2 to deploy your ContentaJS app.
  // @see https://pm2.io/docs/en/runtime/reference/ecosystem-file/#deploy-options
  deploy: {},
};
