#!/bin/bash

# Navigate to Backend-Database-Management directory
cd ../../Backend-Database-Management

# Bring down any existing Docker containers
sudo docker-compose down

# Rebuild and start the containers in detached mode
sudo docker-compose up --build -d

# Navigate back to the Backend-API-Security/asJS directory
cd ../Backend-API-Security/asJS
