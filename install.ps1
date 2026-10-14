# Antigravity Model Quota Tracker Plugin Installer
Write-Host "Installing Antigravity Model Quota Tracker Plugin..." -ForegroundColor Cyan

$dest = Join-Path $env:USERPROFILE ".gemini\config\plugins\model-quota-tracker"
if (-not (Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest -Force | Out-Null
}

$source = $PSScriptRoot
Copy-Item -Path "$source\plugin.json" -Destination "$dest\plugin.json" -Force
Copy-Item -Path "$source\sidecars" -Destination "$dest\" -Recurse -Force

Write-Host "Installation complete!" -ForegroundColor Green
Write-Host "Installed to: $dest" -ForegroundColor Yellow
Write-Host "Please restart Antigravity to activate the plugin." -ForegroundColor Cyan
