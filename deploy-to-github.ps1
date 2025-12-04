# Deploy to GitHub - interactive helper
# IMPORTANT: Review this script before running. It will create a GitHub repo using your PAT.

param(
    [string]$GitHubUser = 'hawkins-kalambo',
    [string]$RepoName = 'frank-adriano-website'
)

Write-Host "This script will:
 - initialize git (if needed)
 - create the repo under $GitHubUser using your PAT
 - add origin, set branch to main and push"

Set-Location -Path (Get-Location)

# Commit
if (-not (Test-Path .git)) { git init }
git add .
try { git commit -m "Initial commit - Frank Adriano Website" } catch { Write-Host "No changes to commit or commit failed." }

# Prompt for token
$pat = Read-Host "Enter your GitHub Personal Access Token (will not be stored)"
if (-not $pat) { Write-Host "No token provided — aborting."; exit 1 }

# Create repo via GitHub API
$body = @{ name = $RepoName; description = "Frank Adriano Website"; private = $false } | ConvertTo-Json
try {
    Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers @{ Authorization = "token $pat"; "User-Agent" = "powershell" } -Body $body -ContentType "application/json"
    Write-Host "Repository created on GitHub (or already exists)."
} catch {
    Write-Host "Repository creation may have failed: $_"
}

# Add remote (replace existing)
try { git remote remove origin } catch {}
git remote add origin "https://github.com/$GitHubUser/$RepoName.git"

git branch -M main

# Push (you may be prompted for credentials)
Write-Host "Pushing to GitHub..."
git push -u origin main

Write-Host "Done. If push failed due to authentication, run 'git push' and when prompted use your GitHub username and the PAT as the password."