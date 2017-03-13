const constants = {
  development: {
    PORT: 3000,
    DB_URI: 'mongodb://127.0.0.1:27017',
  },
  production: {
    port: 8080,
    DB_URI: 'mongodb://127.0.0.1:27017',
  },
};

export default (key) => {
  const ENV = process.env.NODE_ENV || 'development';
  const config = constants[ENV];

  return config[key];
};
