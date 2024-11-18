#!/bin/bash

# Run the script to recreate the database
./recreateDB.sh

npm test tests/*.test.js