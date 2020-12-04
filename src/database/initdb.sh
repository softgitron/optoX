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
INITIALIZATION_FILE=$(cat /config/$REGION/init_tables.sql)
run_dbcommand "$INITIALIZATION_FILE"

if [ "$REGION" != 'central' ]
then
  # https://hevodata.com/learn/postgresql-logical-replication/
  # Join publications if regional node
  # Wait while for central database to come online
  sleep 5
  CONNECTION_STRING="user=$POSTGRES_USER password=$POSTGRES_PASSWORD host=database-central port=5432 dbname=$POSTGRES_DB"
  run_dbcommand "CREATE SUBSCRIPTION ${REGION}_subscription CONNECTION '$CONNECTION_STRING' PUBLICATION ${REGION}_publication;"
else
  # Create initial administrator user
  run_dbcommand "INSERT INTO administrators (email, password, access_level) VALUES ('$WEB_GUI_USERNAME', '$WEB_GUI_PASSWORD', 'Administrator');"
  # Import initial values
  if [ "$DEBUG" = 'true' ]
  then
    INITIALIZATION_FILE=$(cat /config/$REGION/init_values.sql)
    run_dbcommand "$INITIALIZATION_FILE"
  fi
fi