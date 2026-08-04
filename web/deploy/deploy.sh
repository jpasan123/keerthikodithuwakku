#!/usr/bin/env bash
# Deploy keerthi-kodithuwakku-web on the company server.
# Usage (on server): bash deploy/deploy.sh
set -euo pipefail

APP_NAME="keerthi-kodithuwakku-web"
APP_PORT="${PORT:-3001}"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT_DIR"

echo "==> Pull latest"
git pull --ff-only origin main

echo "==> Install dependencies"
npm ci

echo "==> Build"
npm run build

echo "==> Restart PM2 ($APP_NAME on port $APP_PORT)"
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  PORT="$APP_PORT" pm2 restart "$APP_NAME" --update-env
else
  PORT="$APP_PORT" pm2 start deploy/ecosystem.config.cjs --only "$APP_NAME"
fi

pm2 save
echo "==> Done. App listening on http://127.0.0.1:$APP_PORT"
