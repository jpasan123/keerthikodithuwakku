/** PM2 process for this repo. Set PORT in .env or shell before start. */
module.exports = {
  apps: [
    {
      name: "keerthi-kodithuwakku-web",
      cwd: __dirname + "/..",
      script: "node_modules/next/dist/bin/next",
      args: "start -p " + (process.env.PORT || 3001),
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT || 3001,
      },
      max_memory_restart: "512M",
    },
  ],
};
