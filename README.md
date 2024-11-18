# M-321 Distributed Systems: Security Backend
## Overview
This repository contains the security backend developed as part of a group project for a school module on Distributed Systems. The backend ensures secure communication between the frontend and the database.
Furthermore you'll find a DB by [Papasteve5](https://github.com/Papasteve5), this is due to the need for it to perform unit tests on the backend.
## Features
- Authentication and Authorization via JWT
- Secured Endpointsbased on Data from JWT
- Communication to a Database via Sanitized querries
- Code Split by Logic
## Database
As mentioned Earlier the Database is provided by: [Papaseteve5](https://github.com/Papasteve5)
## Instalation
1. Clone this repository
```bash
git clone https://github.com/ERMFox/M-321-Distributed-Systems.git
```
2. Navigate to the project directory:
```bash
cd M-321-Distributed-Systems/Backend-API-Security
```
3. install dependencies
```bash
npm install
```
4. Create a .env with the nescecary variables, you can find the needed ones in /Backend-API-Security/config/config.js
5. start the backend
```bash
node server.js
```
