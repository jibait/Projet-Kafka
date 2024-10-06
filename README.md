# Projet-Kafka

Projet Kafka ESIEA 2024-2025

Ce projet a été réalisé dans le cadre du cours de porgrammation en temps réel de 3ème année de cycle ingénieur de l'ESIEA. Il regroupe l'utilisation de plusieurs technologies :

- MongoDB pour la base de données et le stockage des informations provenant de l'API.
- Kafka pour la gestion en temps réel des données entrantes.
- Hadoop pour le traitement des données.
- React pour l'interface utilisateur
- Docker pour la conteneurisation du projet, facilitant le déploiement.

### Membres du groupe

- Lino MOREAU
- Jean-Baptiste LELANDAIS
- Étienne CHEVROLLIER
- Clément CUVIER
- Frédéric HILLERITEAU


### Base de données

La base de données a été a été pensée pour que dès le lancement du projet, les données soient restaurées grâce aux fichiers binaires présents dans le dossier `mongo_backup/TWITCH-API`. Il ne faut surtout pas toucher à ces fichiers.
Le serveur de la BDD fait très régulièrement une backup qui met automatiquement les fichiers binaires en local à jour. Ainsi, il suffit de remettre les changements sur Github pour que la prochaine personne qui démarre le projet ait accès aux nouvelles données.

## Traitement de données

### Données

Les données utilisées dans ce projet proviennent de l'API Twitch.
