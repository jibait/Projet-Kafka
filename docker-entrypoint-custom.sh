#!/bin/bash
set -e

# Créer les fichiers de log s'ils n'existent pas
touch /var/log/backup.log /var/log/restore.log

# Démarrer MongoDB en arrière-plan
docker-entrypoint.sh mongod &

# Attendre que MongoDB soit prêt
until mongosh --host localhost --eval "print(\"waited for connection\")"
do
    sleep 2
done

echo "MongoDB est prêt. Exécution du script de restauration..."

# Exécuter le script de restauration
/usr/local/bin/restore.sh >> /var/log/restore.log 2>&1

echo "Restauration terminée. Démarrage de cron..."

# Démarrer cron après la restauration
cron

echo "Cron démarré. Le conteneur est maintenant pleinement opérationnel."

# Garder le conteneur en vie en surveillant à la fois backup.log et MongoDB
tail -f /var/log/backup.log & 
wait