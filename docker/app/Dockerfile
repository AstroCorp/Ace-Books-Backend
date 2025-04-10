FROM node:22-alpine3.20

RUN apk add --no-cache curl && \
	apk add --no-cache nano && \
    curl -o- -L https://yarnpkg.com/install.sh | sh && \
	npm install -g @nestjs/cli

ENV PATH=/root/.yarn/bin:$PATH

WORKDIR /app

COPY . .

RUN chmod +x /app/docker/app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "/app/docker/app/entrypoint.sh"]
