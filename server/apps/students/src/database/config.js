module.exports = {
    development: {
        dialect: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'postgres',
        database: 'filosoft',
    },
    test: {
        dialect: '',
        host: '',
        port: 5432,
        username: '',
        password: '',
        database: '',
    },
    production: {
        dialect: '',
        host: '',
        port: 5432,
        username: '',
        password: '',
        database: '',
    },
}