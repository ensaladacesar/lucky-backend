const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lucky-backend',
  password: 'minacleo',
  port: 5432,
});