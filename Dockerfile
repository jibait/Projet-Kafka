# Utiliser l'image de base MongoDB
FROM mongo

# Copier les scripts de sauvegarde et de restauration dans le conteneur
COPY backup.sh /usr/local/bin/backup.sh
COPY restore.sh /usr/local/bin/restore.sh
COPY docker-entrypoint-custom.sh /usr/local/bin/

# Donner les permissions d'exécution aux scripts
RUN chmod +x /usr/local/bin/backup.sh /usr/local/bin/restore.sh /usr/local/bin/docker-entrypoint-custom.sh

# Installer cron
RUN apt-get update && apt-get install -y cron

# Créer les fichiers de log et donner les bonnes permissions
RUN touch /var/log/backup.log /var/log/restore.log && \
    chmod 666 /var/log/backup.log /var/log/restore.log

# Ajouter une tâche cron pour effectuer le dump toutes les 5 minutes
RUN echo "*/5 * * * * root /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1" >> /etc/crontab

# Entrée personnalisée
CMD ["/usr/local/bin/docker-entrypoint-custom.sh"]