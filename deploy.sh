#!/bin/bash

# Script de déploiement rapide pour DayaHack
# Usage: ./deploy.sh

echo ""
echo "========================================"
echo "  DEPLOYMENT SCRIPT - DayaHack"
echo "========================================"
echo ""

# Configuration
read -p "Tes initiales GitHub (ex: octocat): " GITHUB_USERNAME
read -p "Nom du repo (ex: dayahack): " GITHUB_REPO

GITHUB_URL="https://github.com/$GITHUB_USERNAME/$GITHUB_REPO.git"

echo ""
echo "[1] Repo URL: $GITHUB_URL"
echo ""

# Ajouter la remote
echo "[2] Ajout de la remote GitHub..."
git remote add origin $GITHUB_URL 2>/dev/null || git remote set-url origin $GITHUB_URL

# Renommer la branche
echo ""
echo "[3] Renommage de master en main..."
git branch -M main

# Push
echo ""
echo "[4] Push vers GitHub..."
git push -u origin main

echo ""
echo "========================================"
echo "  PROCHAINES ÉTAPES:"
echo "========================================"
echo ""
echo "1. Aller sur https://vercel.com"
echo "2. Cliquer sur 'New Project'"
echo "3. Importer depuis GitHub: $GITHUB_URL"
echo "4. Cliquer 'Deploy'"
echo ""
echo "Votre app sera live en 30 secondes!"
echo ""
