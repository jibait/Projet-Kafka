#!/bin/sh

# Nom de la base de données
DB_NAME="TWITCH-API"
MONGO_USER="root" # Nom d'utilisateur MongoDB
MONGO_PASS='root' # Mot de passe MongoDB

# Répertoire du dump
DUMP_DIR="/data/db/mongo_backup/$DB_NAME"

# Vérifiez si le répertoire du dump existe
if [ -d "$DUMP_DIR" ]; then
    # Restaurer le dump
    mongorestore --uri="mongodb://$MONGO_USER:$MONGO_PASS@mongo:27017/$DB_NAME?authMechanism=SCRAM-SHA-256" \
    --authenticationDatabase=admin \
    --drop \
    "$DUMP_DIR"    
    echo "Base de données $DB_NAME restaurée à partir du dump."
else
    echo "Aucun dump trouvé pour la base de données $DB_NAME."
fi
