const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	host: process.env.PG_HOST,
	post: process.env.PG_DATABASE,
	database: process.env.PG_PORT,
};

const proConfig = {
	connectionString: process.env.DATABAsE_URL,
};

const pool = new Pool(
	process.env.NODE_ENV === "production" ? proConfig : devConfig
);

module.exports = pool;
