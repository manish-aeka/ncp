# GitHub Deployment (Cloudflare)

This project is configured to deploy through GitHub Actions to Cloudflare Workers.

## 1) Push your code to GitHub

Use a branch named `main` for production deploys.

## 2) Add GitHub repository secrets

In your GitHub repo:
`Settings -> Secrets and variables -> Actions -> New repository secret`

Create these two secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Required token permissions

For `CLOUDFLARE_API_TOKEN`, use a token that can deploy Workers:

- Account: `Cloudflare Workers Scripts:Edit`
- Account: `Account Settings:Read`
- Zone permissions are optional unless your deployment flow requires them.

## 3) Deploy

A deploy runs automatically on every push to `main` via:

- `.github/workflows/deploy-cloudflare.yml`

You can also run it manually from GitHub Actions (`workflow_dispatch`).

## 4) Local test before push (optional)

```bash
bun install
bun run build
```

## Notes

- Worker app name and entrypoint come from `wrangler.jsonc`.
- If you change environment bindings later (KV, D1, R2, vars), update `wrangler.jsonc` and secrets as needed.
