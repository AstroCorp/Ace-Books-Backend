FROM node:20-alpine3.18

RUN apk add --no-cache curl && \
	apk add --no-cache nano && \
    curl -o- -L https://yarnpkg.com/install.sh | sh && \
	npm install -g @nestjs/cli

ENV PATH /root/.yarn/bin:$PATH

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start:dev"]
