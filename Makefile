.PHONY: install test build run docker-build docker-up

install:
	pip install -r requirements.txt

test:
	pytest -v

build:
	@mkdir -p build
	@cp index.html login.html register.html script.js style.css build/
	@echo "Build completed successfully"
run:
	@echo "Open index.html in a web browser to run the application"

docker-build:
	docker build -t digital-library .

docker-up:
	docker compose up --build