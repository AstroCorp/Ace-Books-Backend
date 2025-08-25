BACKEND_CONTAINER_NAME = ace-books-backend-app-1

backend-docker-exec:
	@docker exec -it $(BACKEND_CONTAINER_NAME) $(cmd)

backend-yarn-install:
	@docker exec -it $(BACKEND_CONTAINER_NAME) yarn install

backend-yarn-add:
	@docker exec -it $(BACKEND_CONTAINER_NAME) yarn add $(packages)

backend-yarn-remove:
	@docker exec -it $(BACKEND_CONTAINER_NAME) yarn remove $(packages)

backend-tailwind:
	@docker exec -it $(BACKEND_CONTAINER_NAME) yarn tailwind

backend-reset-db:
	@docker exec -it $(BACKEND_CONTAINER_NAME) yarn reset-db

backend-test-e2e:
	@docker exec -it $(BACKEND_CONTAINER_NAME) yarn test:e2e $(if $(test),$(test),)
