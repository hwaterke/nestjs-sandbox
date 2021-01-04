#!/usr/bin/env bash

yarn typeorm migration:run --config scripts/migrations/create-migration.json
yarn typeorm migration:generate --config scripts/migrations/create-migration.json --name CIMigration

retVal=$?
if [ $retVal -eq 1 ]; then
    exit 0
fi
exit 1
