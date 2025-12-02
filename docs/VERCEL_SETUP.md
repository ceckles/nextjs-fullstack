# Vercel Setup Guide for CI/CD

This guide explains how to obtain all the required Vercel secrets for GitHub Actions.

## Step-by-Step Instructions

### 1. Get VERCEL_TOKEN

1. Go to [Vercel Account Tokens](https://vercel.com/account/tokens)
2. Click **"Create Token"**
3. Give it a descriptive name (e.g., "GitHub Actions CI/CD")
4. Set expiration (recommended: 90 days or custom)
5. Click **"Create Token"**
6. **Copy the token immediately** - you won't be able to see it again!

### 2. Get VERCEL_ORG_ID

**Option A: For Teams**
1. Go to [Vercel Teams](https://vercel.com/teams)
2. Click on your team
3. Go to **Settings** → **General**
4. Copy the **Team ID** (looks like `team_xxxxxxxxxxxxx`)

**Option B: For Personal Account**
1. Go to [Vercel Account Settings](https://vercel.com/account)
2. Go to **General** tab
3. Copy the **User ID** (looks like `user_xxxxxxxxxxxxx`)

### 3. Get VERCEL_PROJECT_ID_DEV

1. Go to your **development project** in Vercel
   - If you don't have a separate dev project, use the same project ID for both dev and prod
2. Click on the project
3. Go to **Settings** → **General**
4. Scroll down to find **Project ID**
5. Copy the Project ID (looks like `prj_xxxxxxxxxxxxx`)

### 4. Get VERCEL_PROJECT_ID_PROD

1. Go to your **production project** in Vercel
   - If you're using the same project for both environments, use the same Project ID
2. Click on the project
3. Go to **Settings** → **General**
4. Scroll down to find **Project ID**
5. Copy the Project ID (looks like `prj_xxxxxxxxxxxxx`)

**Note:** If you're using a single Vercel project for both dev and prod:
- Use the same Project ID for both `VERCEL_PROJECT_ID_DEV` and `VERCEL_PROJECT_ID_PROD`
- The workflows will use different environments (`development` vs `production`) automatically

### 5. Get VERCEL_PROD_URL

This is simply your production deployment URL:

1. Go to your production project in Vercel
2. Click on the **Deployments** tab
3. Click on the latest production deployment
4. Copy the URL (e.g., `https://your-app.vercel.app`)
   - Or use your custom domain if configured

**Examples:**
- `https://my-inventory-app.vercel.app`
- `https://inventory.example.com` (if using custom domain)

## Adding Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add each secret one by one:

| Secret Name | Value | Example |
|------------|-------|---------|
| `VERCEL_TOKEN` | Token from step 1 | `xxxxxxxxxxxxx` |
| `VERCEL_ORG_ID` | Team/User ID from step 2 | `team_xxxxxxxxxxxxx` |
| `VERCEL_PROJECT_ID_DEV` | Dev project ID from step 3 | `prj_xxxxxxxxxxxxx` |
| `VERCEL_PROJECT_ID_PROD` | Prod project ID from step 4 | `prj_xxxxxxxxxxxxx` |
| `VERCEL_PROD_URL` | Production URL from step 5 | `https://your-app.vercel.app` |

## Alternative: Using Vercel CLI

You can also get some of these values using the Vercel CLI:

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login to Vercel
vercel login

# Link your project (this will show your project ID)
vercel link

# Get your team/user ID
vercel whoami
```

## Quick Reference: Where to Find Each Value

| Secret | Location in Vercel |
|--------|-------------------|
| `VERCEL_TOKEN` | Account → Tokens → Create Token |
| `VERCEL_ORG_ID` | Account → General (Team ID) or Teams → Settings |
| `VERCEL_PROJECT_ID_DEV` | Project → Settings → General → Project ID |
| `VERCEL_PROJECT_ID_PROD` | Project → Settings → General → Project ID |
| `VERCEL_PROD_URL` | Project → Deployments → Latest deployment URL |

## Troubleshooting

### "Invalid token" error
- Make sure the token hasn't expired
- Regenerate the token if needed

### "Project not found" error
- Verify the Project ID is correct
- Make sure the token has access to the project
- Check that you're using the correct Org ID

### "Permission denied" error
- Ensure your Vercel account has access to the project
- For teams, make sure you're a member with appropriate permissions

