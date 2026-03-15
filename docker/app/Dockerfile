FROM node:24-alpine3.23

RUN apk add --no-cache curl && \
	apk add --no-cache nano && \
	npm install -g @nestjs/cli && \
    npm install --global corepack@latest && \
	corepack enable pnpm

WORKDIR /app

COPY . .

RUN chmod +x /app/docker/app/entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["/bin/sh", "/app/docker/app/entrypoint.sh"]
