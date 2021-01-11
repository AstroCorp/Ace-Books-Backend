interface jwt {
    secret: string,
    timeout: string,
}

interface mail {
    host: string,
    port: number,
    username: string,
    password: string,
}

interface configuration {
    jwt: jwt,
    mail: mail,
}

const config: configuration = {
    jwt: {
        secret: 'secretKey',
        timeout: '900s', // 15 min
    },
    mail: {
        host: 'smtp.gmail.com',
        port: 587,
        username: '',
        password: '',
    },
};

export default config;
