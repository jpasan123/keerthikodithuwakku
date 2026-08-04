# Company server setup — 4 frontend sites

All sites live under `/var/www/` on one Linux server. Each site has its own folder, port, and GitHub repo.

| Site | Folder | Port | Repo |
|------|--------|------|------|
| Keerthi Kodithuwakku | `/var/www/keerthi-kodithuwakku-web` | 3001 | developer-esol/keerthi-kodithuwakku-web |
| Jendo | `/var/www/jendo-landing` | 3002 | developer-esol/jendo-landing |
| Effective Solutions | `/var/www/effective-site` | 3003 | developer-esol/effective-site |
| Koding | `/var/www/koding-site` | 3004 | developer-esol/coding-site |

## 1. One-time server prep

```bash
sudo apt update && sudo apt install -y git nginx curl
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
```

## 2. Clone each site

```bash
cd /var/www
git clone https://github.com/developer-esol/keerthi-kodithuwakku-web.git
git clone https://github.com/developer-esol/jendo-landing.git
git clone https://github.com/developer-esol/effective-site.git
git clone https://github.com/developer-esol/coding-site.git
```

GitHub access: use the existing `developer-esol` deploy token on the server (`git config credential.helper store` after first clone).

## 3. Environment files (never commit secrets)

```bash
cp /var/www/keerthi-kodithuwakku-web/.env.example /var/www/keerthi-kodithuwakku-web/.env
# Edit each .env with Brevo, Gemini, GA keys (Keerthi) and site-specific keys for others
nano /var/www/keerthi-kodithuwakku-web/.env
```

## 4. First deploy per site

```bash
cd /var/www/keerthi-kodithuwakku-web && bash deploy/deploy.sh
cd /var/www/jendo-landing && bash deploy/deploy.sh
cd /var/www/effective-site && bash deploy/deploy.sh
cd /var/www/koding-site && bash deploy/deploy.sh
```

## 5. Nginx preview (IP + port)

Copy each `deploy/nginx.conf.example` into `/etc/nginx/sites-available/`, enable, reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Preview URLs (replace `SERVER_IP`):

- Keerthi: `http://SERVER_IP:8081`
- Jendo: `http://SERVER_IP:8082`
- Effective: `http://SERVER_IP:8083`
- Koding: `http://SERVER_IP:8084`

## 6. Domain cutover (later)

Point DNS A records to the server IP. Enable the domain `server {}` blocks in each nginx example. Add SSL:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d keerthikodithuwakku.com -d www.keerthikodithuwakku.com
```

## 7. Redeploy after code changes

```bash
cd /var/www/keerthi-kodithuwakku-web && git pull && bash deploy/deploy.sh
```

## 8. Remove Vercel

After DNS points to the company server and smoke tests pass, remove domains from Vercel and delete/archive Vercel projects.
