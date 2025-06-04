HOME_DIR=$(shell echo $$HOME)

BINARY_PATH=./bin/start_page
MAIN_PATH=./cmd/main.go

DB_DRIVER=sqlite3
DB_PATH=$(HOME_DIR)/.local/share/start_page/start_page.db
DB_PATH=$(HOME_DIR)/.local/share/start_page/start_page.db

GOOSE_DBSTRING=file:$(DB_PATH)?cache=shared
GOOSE_MIGRATION_DIR=./migrations

build:
	@go build -o $(BINARY_PATH) $(MAIN_PATH)
	@chmod +x $(BINARY_PATH)

up:
	@GOOSE_MIGRATION_DIR=$(GOOSE_MIGRATION_DIR) \
	GOOSE_DRIVER=$(DB_DRIVER) GOOSE_DBSTRING=$(GOOSE_DBSTRING) goose up

reset:
	@GOOSE_MIGRATION_DIR=$(GOOSE_MIGRATION_DIR) \
	GOOSE_DRIVER=$(DB_DRIVER) GOOSE_DBSTRING=$(GOOSE_DBSTRING) goose reset

create:
	@GOOSE_DRIVER=$(DB_DRIVER) GOOSE_DBSTRING=$(GOOSE_DBSTRING) GOOSE_MIGRATION_DIR=$(GOOSE_MIGRATION_DIR) \
		goose create $(NAME) sql
