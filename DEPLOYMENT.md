# Guide de déploiement - DayaHack

## Options d'hébergement recommandées

### 1. **Vercel** (Recommandé - Gratuit & Simple)

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel
```

- ✅ Gratuit avec domaine vercel.app
- ✅ Déploiement automatique avec GitHub
- ✅ Support Node.js natif
- Site: https://vercel.com

### 2. **Railway** (Gratuit avec crédit)

```bash
# Installer CLI
npm install -g @railway/cli

# Se connecter
railway login

# Initialiser et déployer
railway init
railway up
```

- ✅ $5 de crédit gratuit/mois
- ✅ Interface simple
- ✅ Support complet Node.js
- Site: https://railway.app

### 3. **Render** (Gratuit)

```bash
# Instructions:
# 1. Pousser le code sur GitHub
# 2. Aller sur https://render.com
# 3. Créer un nouveau "Web Service"
# 4. Connecter votre repo GitHub
# 5. Configuration auto
```

- ✅ Gratuit (avec quelques limitations)
- ✅ Déploiement facile via GitHub
- ✅ Support Node.js
- Site: https://render.com

### 4. **Heroku** (Payant)

```bash
# Installer Heroku CLI
npm install -g heroku

# Se connecter
heroku login

# Créer l'app
heroku create dayahack

# Déployer
git push heroku main
```

- ✅ Très fiable
- ✅ Support excellent
- ⚠️ Payant depuis 2022 ($7/mois minimum)
- Site: https://heroku.com

## Pré-requis pour tous les services

### 1. Initialiser Git (si pas déjà fait)

```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Créer un repo GitHub

```bash
# 1. Créer un repo sur https://github.com/new
# 2. Pousser le code:
git branch -M main
git remote add origin https://github.com/votre-user/dayahack.git
git push -u origin main
```

### 3. Variables d'environnement

Créer un `.env` avec:

```
PORT=5000
NODE_ENV=production
JWT_SECRET=une_clé_très_secrète_et_longue
```

## Étapes de déploiement recommandées

### Pour Vercel (Plus simple)

1. Créer compte https://vercel.com
2. Importer le projet GitHub
3. Cliquer "Deploy"
4. C'est tout!

### Pour Railway

1. Créer compte https://railway.app
2. Créer nouveau projet
3. Connecter GitHub
4. Configurer variables d'environnement
5. Deploy automatique

## Après le déploiement

- L'app sera accessible via une URL publique
- Les données JSON sont stockées localement (données perdues au redémarrage)
- Pour résilience, implémenter une base de données (MongoDB Atlas, PostgreSQL, etc.)

## Migration vers base de données

Pour un déploiement permanent, migrer de JSON vers:

- **MongoDB Atlas** (Gratuit jusqu'à 512MB)
- **PostgreSQL** sur Railway/Render
- **Supabase** (Firebase alternatif gratuit)

---

**Quelle plateforme choisir ?**

- 🥇 **Vercel**: Parfait pour commencer (gratuit, simple, rapide à déployer)
- 🥈 **Railway**: Bon équilibre gratuit/payant
- 🥉 **Render**: Alternative moderne à Heroku
