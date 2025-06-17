HOME_DIR=$(shell echo $$HOME)

BINARY_PATH=./bin/start_page
MAIN_PATH=./cmd/start_page/main.go

DB_DRIVER=sqlite3
DB_PATH=$(HOME_DIR)/.local/share/start_page/start_page.db # Removed duplicate

GOOSE_DBSTRING=file:$(DB_PATH)?cache=shared
GOOSE_MIGRATION_DIR=./migrations

.PHONY: clean

build-web: 
	@cd ./internals/web/ && bun i && NODE_ENV=production bun run build

build-server:
	@go build -o $(BINARY_PATH) $(MAIN_PATH)
	@chmod +x $(BINARY_PATH)

build-prod: build-web build-server

run: build-server
	@$(BINARY_PATH) 
install: build-prod
	@mv $(BINARY_PATH) $(HOME_DIR)/.local/bin/start_page

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
