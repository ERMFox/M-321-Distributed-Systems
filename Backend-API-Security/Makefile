compile:
	@echo "Compiling project"
	@sh ./compile.sh
	@echo "Compiling complete"

build:
	@echo "Building Docker image"
	@docker build -t my-server-image .
	@echo "Docker image built"

run: compile build
	@echo "Running Docker container"
	@docker run -p 9080:9080 --name my-server-container --rm my-server-image