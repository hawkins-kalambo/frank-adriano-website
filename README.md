# Frank Adriano — Campaign Website

This is a small static website promoting Frank Adriano for FAFASA Speaker 2025.

Local preview

- Option 1: Use Python's built-in server (works on Windows if Python is installed):

```powershell
# from project root
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

- Option 2: Use VS Code Live Server extension.

Accessibility & features

- Mobile responsive with an accessible hamburger menu.
- Animated hero vote banner (typing + caret) that triggers when visible.
- ARIA roles, skip link, and focus styles for keyboard navigation.
- Color palette: #006B3F (primary), #4CAF50 (accent), #E8F5E9 (cards/background).

Deploy to GitHub (optional)

I provided a small `deploy-to-github.ps1` script below — it will prompt for a Personal Access Token and create/push to `https://github.com/hawkins-kalambo/frank-adriano-website.git`. Use carefully and do not paste tokens into shared terminals.

```powershell
# Example quick deploy (do not run blindly):
Set-Location -Path "E:\frank-adriano-website"
# Initialize & commit
git init
git add .
git commit -m "Initial commit - Frank Adriano Website"
# Create remote (replace with your repo URL) and push
# git remote add origin https://github.com/hawkins-kalambo/frank-adriano-website.git
# git branch -M main
# git push -u origin main
```

If you want, I can run through pushing this repository to GitHub with your guidance (I will provide precise commands and explain how to supply a token securely).