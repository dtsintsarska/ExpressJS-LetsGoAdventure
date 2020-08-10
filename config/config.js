const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        authCookieName: 'x-auth-token',
        port: process.env.PORT || 9999,
        privateKey: process.env.PRIVATE_KEY,
        DB_url: process.env.DB_URL
    },
    production: {}
};

module.exports = config[env];