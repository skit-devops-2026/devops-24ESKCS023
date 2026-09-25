.PHONY: install test build run docker-build docker-up

install:
	cd server && npm ci
	cd client && npm ci

test:
	cd server && npm test

build:
	cd client && npm run build

run:
	cd server && npm run dev

docker-build:
	docker build -t digital-library-server ./server
	docker build -t digital-library-client ./client

docker-up:
	docker compose up --build