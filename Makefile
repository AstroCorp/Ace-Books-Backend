BACKEND_CONTAINER_NAME = ace-books-backend-app-1

backend-docker-exec:
	@docker exec -it $(BACKEND_CONTAINER_NAME) $(filter-out $@,$(MAKECMDGOALS))

backend-pnpm-install:
	@docker exec -it $(BACKEND_CONTAINER_NAME) pnpm install

backend-pnpm-add:
	@docker exec -it $(BACKEND_CONTAINER_NAME) pnpm add $(filter-out $@,$(MAKECMDGOALS))

backend-pnpm-remove:
	@docker exec -it $(BACKEND_CONTAINER_NAME) pnpm remove $(filter-out $@,$(MAKECMDGOALS))

backend-tailwind:
	@docker exec -it $(BACKEND_CONTAINER_NAME) pnpm run tailwind

backend-reset-db:
	@docker exec -it $(BACKEND_CONTAINER_NAME) pnpm run reset-db

backend-test-e2e:
	@docker exec -it $(BACKEND_CONTAINER_NAME) pnpm run test:e2e $(filter-out $@,$(MAKECMDGOALS))

backend-test-integration:
	@docker exec -it $(BACKEND_CONTAINER_NAME) pnpm run test:integration $(filter-out $@,$(MAKECMDGOALS))

backend-test-unit:
	@docker exec -it $(BACKEND_CONTAINER_NAME) pnpm run test:unit $(filter-out $@,$(MAKECMDGOALS))
