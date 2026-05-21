# GitHub Deployment (Cloudflare via GitHub Actions)

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

## 3) Deploy

A deploy runs automatically on every push to `main` via:

- `.github/workflows/deploy-github-pages.yml`

You can also run it manually from GitHub Actions (`workflow_dispatch`).

## 4) Local test before push (optional)

```bash
bun install
bun run build
```

## URL

After deployment, use your Cloudflare Worker URL (or custom domain), not `github.io`.

## Notes

- This app is SSR-oriented and does not produce `dist/client/index.html`, so GitHub Pages is not a compatible host for the full app.
