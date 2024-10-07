# Projet-Kafka

Projet Kafka ESIEA 2024-2025

Ce projet a été réalisé dans le cadre du cours de programmation en temps réel de 3ème année de cycle ingénieur de l'ESIEA.

L'objectif de ce projet est de mettre en place une architecture de traitement de données en temps réel.
Le sujet que nous avons choisi est le suivant : "Un site web permettant de visualiser les statistiques des streams Twitch en cours en temps réel".

## Membres du groupe

- Lino MOREAU
- Jean-Baptiste LELANDAIS
- Étienne CHEVROLLIER
- Clément CUVIER
- Frédéric HILLERITEAU

## Utilisation

### Prérequis

- Docker
- Docker-compose

### Exécution

Pour exécuter le projet, il suffit de lancer la commande suivante à la racine du projet :

```bash
docker-compose up --build
```

Les différents services vont se lancer progressivement. Une fois tous les services démarrés, l'interface web sera accessible à l'adresse `http://localhost`.

La récupération des premières données peut prendre un certain temps, il faut donc patienter avant de voir les premières données s'afficher sur l'interface web. Les données sont récupérées approximativement toutes les minutes.

## Architecture

Le projet est composé de plusieurs services :

- Un cluster Kafka, qui est utilisé pour la gestion des flux de données entre les différents services. Les données sont envoyées dans des topics Kafka par les différents services et récupérées par les services qui en ont besoin.
- Un service de récupération de données (NodeJS), ce dernier récupère les données de l'API Twitch à interval régulier et les envoie dans le topic Kafka `twitch-streams`. Ce service récupère également les données des jeux et les envoie dans le topic Kafka `twitch-games`.
- Un service de traitement de données (NodeJS) qui récupère les données du topic Kafka `twitch-streams`, les traite et les envoie dans le topic `processed-twitch-data`. Parmi les traitements effectués, on peut citer le calcul du nombre de viewer total ou encore le calcul du nombre de viewer par jeu.
- Le backend de l'application web (NodeJS) qui récupère les données des topic Kafka `processed-twitch-data` et `twitch-games` et les envoie au navigateur via une websocket. Le backend met en cache les données pour pouvoir les envoyer aux nouveaux clients qui se connectent.
- Le frontend de l'application web (React - NextJS) qui récupère les données du backend et les affiche à l'utilisateur.

## Traitement de données

Plusieurs traitements de données sont effectués sur les données récupérées de l'API Twitch :
- Calcul du nombre total de viewers
- Calcul du nombre total de streams
- Calcul du nombre de viewers par jeu
- Calcul du nombre de viewers par langue

## Interface web

L'interface web permet de visualiser les statistiques des streams Twitch en temps réel. Elle est composée de plusieurs graphiques qui affichent les données traitées.

Également, l'interface web permet de rechercher des jeux et de voir l'évolution du nombre de viewers pour un jeu donné.

L'interface web est mise à jour en temps réel grâce à l'utilisation de websockets.

### Données

Les données utilisées dans ce projet proviennent de [l'API Twitch](https://dev.twitch.tv/docs/api/). L'API Twitch permet de récupérer des informations sur les streams en cours, les jeux les plus populaires, les utilisateurs, etc.

### Base de données

Les données traitées devaient initialement être stockées dans une base de données MongoDB. Cependant, par manque de temps, nous n'avons pas pu implémenter cette fonctionnalité. C'est pourquoi les données sont simplement mises en cache dans le backend.

La base de données avait été pensée pour que dès le lancement du projet, les données soient restaurées grâce aux fichiers binaires présents dans le dossier `mongo_backup/TWITCH-API`. Il ne faut surtout pas toucher à ces fichiers.
Le serveur de la BDD fait très régulièrement une backup qui met automatiquement les fichiers binaires en local à jour. Ainsi, il suffit de remettre les changements sur Github pour que la prochaine personne qui démarre le projet ait accès aux nouvelles données.
