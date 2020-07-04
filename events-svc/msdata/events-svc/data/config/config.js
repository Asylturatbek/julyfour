require('dotenv').config();

exports.api = {
	host: 'localhost',
	port: 80081
}

exports.db = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE
}