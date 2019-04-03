const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: '74.208.42.176',
  database: 'pocket',
  password: 'minacleo',
  port: 5432,
});

