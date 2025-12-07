# Dependabot Setup Guide

This guide explains how to configure Dependabot and set up the `GH_DEPENDABOT` secret for automated dependency updates.

## Dependabot Configuration

The project includes a `.github/dependabot.yml` file that configures:
- **npm/pnpm dependencies** - Weekly updates on Mondays
- **GitHub Actions** - Weekly updates on Mondays
- Automatic grouping of production and development dependencies
- Pull request labels and commit message formatting

## Setting Up GH_DEPENDABOT Secret

The `GH_DEPENDABOT` secret is used by Dependabot to authenticate when creating pull requests. This is especially important if:
- You have private package registries
- You need Dependabot to create PRs with proper permissions
- You want to use Dependabot with organization-level settings

### Steps to Add the Secret:

1. **Go to your GitHub repository**
2. **Navigate to Settings** → **Secrets and variables** → **Dependabot**
   - Direct link: `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/dependabot`
3. **Click "New Dependabot secret"**
4. **Add the secret:**
   - **Name:** `GH_DEPENDABOT`
   - **Value:** A GitHub Personal Access Token (PAT) with appropriate permissions

### Creating a GitHub Personal Access Token for Dependabot:

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a descriptive name (e.g., "Dependabot Token")
4. Set expiration (recommended: 90 days or custom)
5. Select the following scopes:
   - `repo` - Full control of private repositories
   - `write:packages` - If using private npm packages
   - `read:packages` - If reading from private registries
6. Click **"Generate token"**
7. **Copy the token immediately** - you won't be able to see it again!
8. Add it as the `GH_DEPENDABOT` secret in your repository

### Important Note

**Dependabot secrets are separate from GitHub Actions secrets!**
- Dependabot secrets: `Settings → Secrets and variables → Dependabot`
- Actions secrets: `Settings → Secrets and variables → Actions`

Make sure you're adding `GH_DEPENDABOT` in the **Dependabot** section, not the Actions section.

### Alternative: Using Dependabot Secrets at Organization Level

For organization-level Dependabot configuration:

1. Go to your **Organization Settings** → **Secrets and variables** → **Dependabot**
2. Add the `GH_DEPENDABOT` secret at the organization level
3. This will be available to all repositories in the organization

## Dependabot Features Enabled

- ✅ Automatic dependency updates (weekly)
- ✅ Grouped updates (production and dev dependencies separately)
- ✅ Automatic pull request creation
- ✅ Labeled PRs for easy filtering
- ✅ Formatted commit messages

## Customization

You can customize the Dependabot configuration by editing `.github/dependabot.yml`:

- **Change update frequency:** Modify the `schedule.interval` (daily, weekly, monthly)
- **Limit PRs:** Adjust `open-pull-requests-limit`
- **Ignore packages:** Add entries to the `ignore` section
- **Custom labels:** Modify the `labels` array

## Troubleshooting

### Dependabot not creating PRs
- Check that Dependabot is enabled in repository settings
- Verify the `.github/dependabot.yml` file is valid YAML
- Ensure the `GH_DEPENDABOT` secret is set correctly

### Authentication errors
- Verify the token has the correct permissions
- Check that the token hasn't expired
- Ensure the secret name matches exactly: `GH_DEPENDABOT`

### Private registry access
- Make sure the token has `read:packages` permission
- Verify the registry URL is accessible
- Check if additional authentication is needed in `.npmrc`

