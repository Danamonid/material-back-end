const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '27.112.79.221',
  database: 'mydatabase',
  password: 'newpassword',
  port: 5432,
});

module.exports = pool;
