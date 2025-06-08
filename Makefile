HOME_DIR=$(shell echo $$HOME)

BINARY_PATH=./bin/start_page
MAIN_PATH=./cmd/start_page/main.go

DB_DRIVER=sqlite3
DB_PATH=$(HOME_DIR)/.local/share/start_page/start_page.db # Removed duplicate

GOOSE_DBSTRING=file:$(DB_PATH)?cache=shared
GOOSE_MIGRATION_DIR=./migrations

.PHONY: build run server tailwind templ dev clean migrate_up migrate_down migrate_create

# Default target
all: run

build:
	@go build -o $(BINARY_PATH) $(MAIN_PATH)
	@chmod +x $(BINARY_PATH)


run: build
	@$(BINARY_PATH) 

server:
	@air \
	--build.cmd "make build" \
	--build.bin $(BINARY_PATH) \
	--build.delay "100" \
	--build.exclude_dir "node_modules" \
	--build.include_ext "go" \
	--build.stop_on_error "false" \
	--misc.clean_on_exit true

tailwind:
	@bun run tailwind-watch

templ:
	@templ generate --watch --proxy="http://localhost:8090" --open-browser=false

dev:
	@make -j3 tailwind templ server

clean:
	@rm -f $(BINARY_PATH)
	@rm -rf $(dir $(DB_PATH)) 

# up:
# 	@GOOSE_MIGRATION_DIR=$(GOOSE_MIGRATION_DIR) \
# 	GOOSE_DRIVER=$(DB_DRIVER) GOOSE_DBSTRING=$(GOOSE_DBSTRING) goose up
#
# reset:
# 	@GOOSE_MIGRATION_DIR=$(GOOSE_MIGRATION_DIR) \
# 	GOOSE_DRIVER=$(DB_DRIVER) GOOSE_DBSTRING=$(GOOSE_DBSTRING) goose reset
#
# create:
# 	@GOOSE_DRIVER=$(DB_DRIVER) GOOSE_DBSTRING=$(GOOSE_DBSTRING) GOOSE_MIGRATION_DIR=$(GOOSE_MIGRATION_DIR) \
# 		goose create $(NAME) sql
