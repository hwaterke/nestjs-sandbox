#!/usr/bin/env bash

set -ex

MIGRATION_NAME=${1?Please provide a name for the migration (start with a capital)}

echo "Generating new migration"

echo "Making sure the database is not running"
docker-compose down

echo "Starting empty database"
docker-compose up -d db

sleep 3

echo "Running existing migrations"
yarn typeorm migration:run --config scripts/migrations/create-migration.json

echo "Creating new migration"
yarn typeorm migration:generate --config scripts/migrations/create-migration.json --name ${MIGRATION_NAME}Migration

echo "Done. Stopping database"
docker-compose down
