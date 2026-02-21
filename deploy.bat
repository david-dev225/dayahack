@echo off
REM Script de déploiement rapide pour DayaHack
REM Assurez-vous d'avoir:
REM  - Créé un repo sur GitHub
REM  - Git installé
REM  - Remplacé "TON_USERNAME" et "TON_REPO" ci-dessous

echo.
echo ========================================
echo   DEPLOYMENT SCRIPT - DayaHack
echo ========================================
echo.

REM ÉTAPE 1: Configurer l'URL du repo GitHub
echo [1] Configuration du repo GitHub...
REM Remplacez ces valeurs:
set GITHUB_USERNAME=TON_USERNAME
set GITHUB_REPO=dayahack
set GITHUB_URL=https://github.com/%GITHUB_USERNAME%/%GITHUB_REPO%.git

echo Repo URL: %GITHUB_URL%
echo.

REM ÉTAPE 2: Ajouter la remote et pousser
echo [2] Ajout de la remote GitHub...
git remote add origin %GITHUB_URL% 2>nul
if errorlevel 1 (
    echo Remote exist déjà, mise à jour...
    git remote set-url origin %GITHUB_URL%
)

echo.
echo [3] Renommage de master en main...
git branch -M main

echo.
echo [4] Push vers GitHub...
git push -u origin main

echo.
echo ========================================
echo   PROCHAINES ÉTAPES:
echo ========================================
echo.
echo 1. Aller sur https://vercel.com
echo 2. Cliquer sur "New Project"
echo 3. Importer depuis GitHub: %GITHUB_URL%
echo 4. Cliquer "Deploy"
echo.
echo Votre app sera live en 30 secondes!
echo.
pause
