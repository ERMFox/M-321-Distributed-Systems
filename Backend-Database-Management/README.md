# Instructions for Tim

## Important Code lines to copy/paste

to access the backend server:
<http://localhost:9090/users>

To build a Docker image:
docker build -t custom-mysql .

To run the image as a container:
docker run --name custom-mysql-container -p 3306:3306 -d custom-mysql
