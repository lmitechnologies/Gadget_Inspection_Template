YAML_FILE = line_config.yaml
ENV_FILE = custom.env
LINE ?= default
NO_CACHE ?= n

.PHONY: init build up down restart help

init:
	@if [ -z "$(LINE)" ]; then \
		echo "Error: LINE is required. Usage: make init LINE=..."; \
		exit 1; \
	fi
	@echo "Generating $(ENV_FILE) for $(LINE) from $(YAML_FILE)..."
	@rm -f $(ENV_FILE)  # Remove existing file
	@awk -v parent="$(LINE):" '\
		BEGIN { in_parent = 0 } \
		{ \
			if ($$0 ~ parent) { \
				in_parent = 1; next; \
			} \
			if (in_parent && $$0 !~ /^[[:space:]]/) { \
				in_parent = 0; \
			} \
			if (in_parent && $$0 ~ /^[[:space:]]/) { \
				gsub(/^[[:space:]]+/, "", $$0); \
				split($$0, pair, ":"); \
				key = pair[1]; \
				value = pair[2]; \
				gsub(/^[[:space:]]+|[[:space:]]+$$/, "", key); \
				gsub(/^[[:space:]]+|[[:space:]]+$$/, "", value); \
				print key "=" value >> "$(ENV_FILE)"; \
			} \
		}' $(YAML_FILE)
	@if [ ! -s $(ENV_FILE) ]; then \
		echo "Error: LINE=$(LINE) not found in $(YAML_FILE) or no values exist."; \
		echo "Available lines are:"; \
		awk '/^[^[:space:]]+:/{gsub(":", ""); print}' $(YAML_FILE); \
		rm -f $(ENV_FILE); \
		exit 1; \
	fi
	@echo "$(ENV_FILE) generated successfully for $(LINE)."

check_file:
	@if [ -f "$(YAML_FILE)" ]; then \
		:; \
	else \
		echo "Error: $(YAML_FILE) does not exist."; \
		exit 1; \
	fi

resolve_compose_file = $(shell SUBFOLDER=$$(grep '^SUBFOLDER=' $(ENV_FILE) | cut -d '=' -f2); \
	if [ -z "$$SUBFOLDER" ]; then \
		echo ./default/docker-compose.yaml; \
	else \
		echo $$SUBFOLDER/docker-compose.yaml; \
	fi)

no_cache = $(if $(filter y,$(NO-CACHE)),--no-cache,)

build: check_file
	@DOCKER_COMPOSE_FILE=$(resolve_compose_file); \
	if [ ! -f "$$DOCKER_COMPOSE_FILE" ]; then \
		echo "Error: Docker Compose file not found at $$DOCKER_COMPOSE_FILE."; \
		exit 1; \
	fi; \
	echo "Using $$DOCKER_COMPOSE_FILE"; \
	docker compose --env-file .env --env-file $(ENV_FILE) -f $$DOCKER_COMPOSE_FILE  build $(no_cache)

pull: check_file
	@DOCKER_COMPOSE_FILE=$(resolve_compose_file); \
	if [ ! -f "$$DOCKER_COMPOSE_FILE" ]; then \
		echo "Error: Docker Compose file not found at $$DOCKER_COMPOSE_FILE."; \
		exit 1; \
	fi; \
	echo "Using $$DOCKER_COMPOSE_FILE"; \
	docker compose --env-file .env --env-file $(ENV_FILE) -f $$DOCKER_COMPOSE_FILE pull

up: check_file
	@DOCKER_COMPOSE_FILE=$(resolve_compose_file); \
	if [ ! -f "$$DOCKER_COMPOSE_FILE" ]; then \
		echo "Error: Docker Compose file not found at $$DOCKER_COMPOSE_FILE."; \
		exit 1; \
	fi; \
	echo "Using $$DOCKER_COMPOSE_FILE"; \
	docker compose --env-file .env --env-file $(ENV_FILE) -f $$DOCKER_COMPOSE_FILE up -d

down: check_file
	@DOCKER_COMPOSE_FILE=$(resolve_compose_file); \
	if [ ! -f "$$DOCKER_COMPOSE_FILE" ]; then \
		echo "Error: Docker Compose file not found at $$DOCKER_COMPOSE_FILE."; \
		exit 1; \
	fi; \
	echo "Using $$DOCKER_COMPOSE_FILE"; \
	VOLUME_FLAG=""; \
	if [ "$(VOLUMES)" = "y" ]; then \
		VOLUME_FLAG="-v"; \
	fi; \
	docker compose --env-file .env --env-file $(ENV_FILE) -f $$DOCKER_COMPOSE_FILE down $$VOLUME_FLAG

restart: check_file
	@DOCKER_COMPOSE_FILE=$(resolve_compose_file); \
	if [ ! -f "$$DOCKER_COMPOSE_FILE" ]; then \
		echo "Error: Docker Compose file not found at $$DOCKER_COMPOSE_FILE."; \
		exit 1; \
	fi; \
	if [ -z "$(SERVICE)" ]; then \
		docker compose --env-file .env --env-file $(ENV_FILE) -f $$DOCKER_COMPOSE_FILE restart; \
	else \
		docker compose --env-file .env --env-file $(ENV_FILE) -f $$DOCKER_COMPOSE_FILE restart $(SERVICE); \
	fi

help:
	@echo "Available targets:"
	@echo "  init      - Generate an .env file based on LINE from YAML_FILE"
	@echo "  build     - Build Docker images using the resolved compose file"
	@echo "  pull      - Pull images defined in the compose file"
	@echo "  up        - Start the services defined in the compose file"
	@echo "  down      - Stop and remove containers"
	@echo "  restart   - Restart services"