# GitHub Deployment (GitHub Pages)

This project is configured to deploy through GitHub Actions to GitHub Pages.

## 1) Push your code to GitHub

Use a branch named `main` for production deploys.

## 2) Configure Pages in GitHub

In your GitHub repo:

1. Open `Settings -> Pages`
2. Under `Build and deployment`, set:
	- `Source`: `GitHub Actions`

No repository secrets are required for this Pages workflow.

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

For this repository, the expected Pages URL is:

- `https://manish-aeka.github.io/ncp/`

## Notes

- The build publishes static assets from `dist/client`.
- SPA fallback is configured by generating `dist/client/404.html` from `index.html` in CI.
