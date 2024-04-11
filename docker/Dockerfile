FROM node:alpine

# Instalar Yarn
RUN apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh

# Añadir el directorio de binarios de Yarn al PATH
ENV PATH /root/.yarn/bin:$PATH

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["yarn", "start:dev"]
