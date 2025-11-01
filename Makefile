BACKEND_CONTAINER_NAME = ace-books-backend-app-1

backend-docker-exec:
	@docker exec -it $(BACKEND_CONTAINER_NAME) $(filter-out $@,$(MAKECMDGOALS))

backend-yarn-install:
	@docker exec -it $(BACKEND_CONTAINER_NAME) yarn install

backend-yarn-add:
	@docker exec -it $(BACKEND_CONTAINER_NAME) yarn add $(filter-out $@,$(MAKECMDGOALS))

backend-yarn-remove:
	@docker exec -it $(BACKEND_CONTAINER_NAME) yarn remove $(filter-out $@,$(MAKECMDGOALS))

backend-tailwind:
	@docker exec -it $(BACKEND_CONTAINER_NAME) yarn tailwind

backend-reset-db:
	@docker exec -it $(BACKEND_CONTAINER_NAME) yarn reset-db

backend-test-e2e:
	@docker exec -it $(BACKEND_CONTAINER_NAME) yarn test:e2e $(filter-out $@,$(MAKECMDGOALS))

backend-test-integration:
	@docker exec -it $(BACKEND_CONTAINER_NAME) yarn test:integration $(filter-out $@,$(MAKECMDGOALS))

backend-test-unit:
	@docker exec -it $(BACKEND_CONTAINER_NAME) yarn test:unit $(filter-out $@,$(MAKECMDGOALS))
