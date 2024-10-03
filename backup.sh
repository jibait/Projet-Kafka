#!/bin/sh

# Nom de la base de données
DB_NAME="TWITCH-API"
MONGO_USER="root" # Nom d'utilisateur MongoDB
MONGO_PASS='root' # Mot de passe MongoDB

# Répertoire de destination pour le dump
DUMP_DIR="/data/db/mongo_backup/"  # Répertoire monté

# Créer le répertoire de dump s'il n'existe pas
mkdir -p $DUMP_DIR

# Démarrer le dump avec authentification
mongodump --uri="mongodb://$MONGO_USER:$MONGO_PASS@mongo:27017/$DB_NAME?authMechanism=SCRAM-SHA-256" \
  --authenticationDatabase=admin \
  --out="$DUMP_DIR"
# Vérifier si la commande a réussi
if [ $? -eq 0 ]; then
    echo "Dump de la base de données $DB_NAME effectué dans le répertoire $DUMP_DIR à $(date)." >> /var/log/backup.log
else
    echo "Erreur lors du dump de la base de données $DB_NAME à $(date)." >> /var/log/backup.log
fi
