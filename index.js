const Hapi = require('@hapi/hapi');
const jwt = require('@hapi/jwt');
const { verifyToken, errorResponse } = require("./utils");
const glob = require('glob');
const path = require('path');

require('dotenv').config();
require('./database');

const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: '127.0.0.1',
        debug: {
            request: ['error']
        },
        routes: {
            cors: {
                origin: ['*'],
                credentials: true
            }
        }
    });
    
    glob.sync('./routes/**/*.js', {
        root: __dirname
    }).forEach(file => {
        console.log(`[LOG] Loading route: ${file}`);
        const route = require(path.join(__dirname, file));
        server.route(route);
    });
    
    await server.register(jwt);

    server.auth.strategy('jwt', 'jwt', {
        keys: {
            key: process.env.SESSION_SECRET_KEY,
            algorithms: ['HS256']
        },
        verify: {
            aud: false,
            iss: false,
            sub: false,
        },
        validate: verifyToken,
    });

    server.auth.default('jwt');

    server.start();
    console.log(`[LOG] Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
});

init();
