.PHONY: install test build run docker-build docker-up

install:
	@echo "No dependency installation required for static HTML/CSS/JS project"

test:
	@echo "Running project tests..."
	@test -f index.html
	@test -f login.html
	@test -f register.html
	@test -f script.js
	@test -f style.css
	@echo "All required project files are present"

build:
	@echo "Building Digital Library..."
	@mkdir -p build
	@cp index.html build/
	@cp login.html build/
	@cp register.html build/
	@cp script.js build/
	@cp style.css build/
	@echo "Build completed successfully"

run:
	@echo "Open index.html in a web browser to run the application"

docker-build:
	docker build -t digital-library .

docker-up:
	docker compose up --build