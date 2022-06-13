module.exports = {
  apps : [{
    name:'Express app',
    script: 'server.js',
    watch: true,
    autorestart: true,
    env_production: {
      NODE_ENV: "production"
   },
   env_development: {
      NODE_ENV: "development"
   }
  }, 
  {
    name:'Worker1',
    script:'./workers/fab-series-worker1.js',
  },
  {
    name:'Worker2',
    script:'./workers/fab-series-worker2.js'
  },
  // {
  //   script: './service-worker/',
  //   watch: ['./service-worker']
  // }
],

  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
