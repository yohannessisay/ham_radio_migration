# WRL Migration

A TypeScript Fastify service that migrates Firestore collections into a PostgreSQL database using Sequelize. It also exposes routes to query user profiles, logbooks, contacts,sync data and get structure of a pre-defined firebase collection.

## Tech Stack

- Runtime: Node.js + TypeScript
- Web Framework: Fastify (+ @fastify/cors)
- Database: PostgreSQL (via Sequelize)
- Firestore Client: Firebase Web SDK (firebase/app, firebase/firestore)
- Utilities: dotenv, uuid

## Architecture

- index.ts
  - Bootstraps Fastify server, registers CORS, routes, and initializes Firebase
- src/db/db.config.ts
  - Initializes Sequelize (Postgres dialect) using DATABASE_URL from .env
- src/models
  - Sequelize models (UserProfile, LogBook, LogbookContacts)
- src/services
  - firebase.service.ts: Singleton Firebase app initialization
  - sync.service.ts: Firestore → Postgres sync logic and data mapping helpers
  - logbook.service.ts, logbook-contact.service.ts, users.service.ts: Query and data-access services
- src/controllers
  - Request handlers delegating to services
- src/routes
  - Route definitions (user, logbook, logbook-contact, sync)
- src/types
  - Shared TypeScript type definitions
- src/utils/responseHandler.ts
  - Response helpers
- config
  - firebaseConfig.example.json: Example Firebase configuration
- .env.example
  - Example environment variables (DATABASE_URL)

## Setup

1) Prerequisites

- Node.js 18+
- PostgreSQL running and accessible

2) Install dependencies

- npm install

3) Environment variables

- Copy .env.example to .env and set your database URL:
  - cp .env.example .env
  - DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DB_NAME

4) Firebase config

- Copy config/firebaseConfig.example.json to config/firebaseConfig.json and fill in:
  - {
    "firebaseConfig": {
    "apiKey": "...",
    "authDomain": "...",
    "projectId": "...",
    "storageBucket": "...",
    "messagingSenderId": "...",
    "appId": "..."
    }
    }

5) Database migrations

- npm run migrate
- To undo last migration: npm run migrate:undo
- To undo all: npm run migrate:undo:all

6) Run the server

- Development: npm run dev
- The server listens on port 4000 (http://localhost:4000)
- Build: npm run build
- Start (after build): npm start

## API Endpoints (cURL examples)

Base URL: http://localhost:4000

- Users — list (supports page, limit, sortBy, sortOrder, search, country)

```bash
curl --location 'http://localhost:4000/users?page=1&limit=10&sortBy=timestamp&sortOrder=DESC'

```

- Users — get by id

```bash
curl "http://localhost:4000/users/USER_UID_HERE"
```

- Logbooks — list (supports page, limit, sortBy, sortOrder, search)

```bash
curl "http://localhost:4000/logbooks?page=1&limit=10&sortBy=timestamp&sortOrder=DESC"
```

- Logbooks — get by id

```bash
curl "http://localhost:4000/logbooks/LOGBOOK_ID_HERE"
```

- Logbooks — get by user id

  ```
  curl --location 'http://localhost:4000/logbooks/getByUserId/USER_ID_HERE'
  ```
- Logbook contacts — list (supports page, limit, sortBy, sortOrder, search)

```bash
curl "http://localhost:4000/logbook-contacts?page=1&limit=10&sortBy=timestamp&sortOrder=DESC&search=W9KV"
```

- Logbook contacts — get by id

```bash
curl "http://localhost:4000/logbook-contacts/CONTACT_ID_HERE"
```

* Logbook contacts — get by user id

  ```
  curl --location 'http://localhost:4000/contacts/getByUserId/USER_ID_HERE'
  ```
* Sync from firebase to postgres

  ```
  curl --location 'http://localhost:4000/sync-all'
  ```
* Get structure of predefined collection from firestore

  ```
  curl --location 'http://localhost:4000/get-structure'
  ```

## Notes

- CORS is enabled for localhost origins in index.ts.
- The script to convert and dump converted data to postgres now can easily be run with the sync-all api call as listed above
- Sequelize is configured for Postgres; ensure DATABASE_URL is valid.

## Improvements (future)

- Add request validation (e.g., zod/TypeBox) and basic tests for services/controllers.
