const constants = {
  development: {
    PORT: 3000,
    DB_URI: 'mongodb://127.0.0.1:27017',
  },
  production: {
    PORT: 8080,
    DB_URI: 'mongodb://mongo:27017/patterns',
  },
};

module.exports = (key) => {
  const ENV = process.env.NODE_ENV || 'development';
  const config = constants[ENV];

  return config[key];
};
