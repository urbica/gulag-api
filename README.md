# Gulag Map API

## Setup

- start postgres 9.6 on 127.0.0.1:5432
- migrate structure `npm run db:migrate`
- add test data `psql -U postgres -d postgres -f ./src/db/seeds/camp-activities.sql` run this command to all files in sql dir
- `npm start`
