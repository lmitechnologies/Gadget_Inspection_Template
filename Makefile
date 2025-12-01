include .env
export $(shell sed -n 's/^\([A-Za-z_][A-Za-z0-9_]*\)=.*/\1/p' .env)

YAML_FILE = line_config.yaml
ENV_FILE = custom.env
LINE ?= default
NO_CACHE ?= n

DEV_HOSTNAME := $(shell hostname | sed 's/.*\(......\)/\1/')
DEV_HOSTNAME_OCTAL := $(shell echo -n ${DEV_HOSTNAME} | od -A n -t o1 | sed -r 's/\s+//g')
INSPECTION_VERSION ?= dev-${DEV_HOSTNAME_OCTAL}

LATEST ?= false

.PHONY: init build up down restart auth help

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

no_cache = $(if $(filter y,$(NO_CACHE)),--no-cache,)

build: check_file
	@DOCKER_COMPOSE_FILE=$(resolve_compose_file); \
	if [ ! -f "$$DOCKER_COMPOSE_FILE" ]; then \
		echo "Error: Docker Compose file not found at $$DOCKER_COMPOSE_FILE."; \
		exit 1; \
	fi; \
	echo "Using $$DOCKER_COMPOSE_FILE"; \
	INSPECTION_VERSION=$(INSPECTION_VERSION) docker compose --env-file .env --env-file $(ENV_FILE) -f $$DOCKER_COMPOSE_FILE build $(no_cache)

pull: check_file
	@DOCKER_COMPOSE_FILE=$(resolve_compose_file); \
	if [ ! -f "$$DOCKER_COMPOSE_FILE" ]; then \
		echo "Error: Docker Compose file not found at $$DOCKER_COMPOSE_FILE."; \
		exit 1; \
	fi; \
	echo "Using $$DOCKER_COMPOSE_FILE"; \
	docker compose --env-file .env --env-file $(ENV_FILE) -f $$DOCKER_COMPOSE_FILE pull

push: check_file
	@DOCKER_COMPOSE_FILE=$(resolve_compose_file); \
	if [ ! -f "$$DOCKER_COMPOSE_FILE" ]; then \
		echo "Error: Docker Compose file not found at $$DOCKER_COMPOSE_FILE."; \
		exit 1; \
	fi; \
	echo "Using $$DOCKER_COMPOSE_FILE"; \
	\
	BV="$(INSPECTION_VERSION)"; \
	if [ -z "$$BV" ]; then \
		echo "Error: INSPECTION_VERSION is not set"; \
		exit 1; \
	fi; \
	echo "INSPECTION_VERSION=$$BV"; \
	\
	echo ""; \
	echo "Discovering images with tag :$$BV ..."; \
	\
	INSPECTION_VERSION=$(INSPECTION_VERSION) docker compose \
		--env-file .env \
		--env-file $(ENV_FILE) \
		-f "$$DOCKER_COMPOSE_FILE" \
		config | \
		sed -n 's/^[[:space:]]*image:[[:space:]]*\(.*\)/\1/p' | \
		sort -u | \
		while read -r img; do \
			if [ -z "$$img" ]; then continue; fi; \
			case "$$img" in \
				*:"$$BV") \
					echo ""; \
					echo ">>> Pushing versioned image: $$img"; \
					docker push "$$img"; \
					if [ "$(LATEST)" = "true" ]; then \
						base=$${img%:*}; \
						echo "Tagging $$img as $$base:latest"; \
						docker tag "$$img" "$$base:latest"; \
						echo "Pushing $$base:latest"; \
						docker push "$$base:latest"; \
					fi; \
					;; \
				*) \
					;; \
			esac; \
		done;

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

REGISTRY_HOST="$(REGION)-docker.pkg.dev"
auth: check_file
	@printf "\nContainer Registry Host: %s\n" "$(REGISTRY_HOST)"
	@printf "Authenticating to container registry...\n"
	@printf "Enter authentication token: "

	@read TOKEN; \
	echo "$$TOKEN" | docker login \
	    -u oauth2accesstoken \
	    --password-stdin "https://$(REGISTRY_HOST)"

		
help:
	@echo "Available targets:"
	@echo "  init      - Generate an .env file based on LINE from YAML_FILE"
	@echo "  build     - Build Docker images using the resolved compose file"
	@echo "  pull      - Pull images defined in the compose file"
	@echo "  push      - Push images defined in the compose file"
	@echo "  up        - Start the services defined in the compose file"
	@echo "  down      - Stop and remove containers"
	@echo "  restart   - Restart services"
	@echo "  auth      - Authenticate with GCP Container Registry"