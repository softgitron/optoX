#!/bin/bash
set -e

function run_dbcommand() {
    echo "$1" | psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB"
}

# Select how the database should be initialized based on the REGION
# REGION environment variable is provided to every container by helm
# cp /config/$REGION/postgresql.conf /etc/postgresql/postgresql.conf
# sync

# Grant user permissions to table
# run_dbcommand "CREATE USER $POSTGRES_USER;"
# run_dbcommand "GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;"

# Initialize database tables
INITIALIZATION_FILE=$(cat /config/$REGION/init.sql)
run_dbcommand "$INITIALIZATION_FILE"

# https://hevodata.com/learn/postgresql-logical-replication/
# Join publications if slave node
if [ "$REGION" != 'central' ]
then
  # Wait while for central database to come online
  sleep 5
  CONNECTION_STRING="user=$POSTGRES_USER password=$POSTGRES_PASSWORD host=database-central port=5432 dbname=$POSTGRES_DB"
  run_dbcommand "CREATE SUBSCRIPTION replica_subscription CONNECTION '$CONNECTION_STRING' PUBLICATION replica_publication;"
fi