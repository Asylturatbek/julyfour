const config = require('./../lib/util-config.js')
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${config.config.db.user}:${config.config.db.password}@${config.config.db.host}:${config.config.db.port}/${config.config.db.database}`
const pool = new Pool({
	connectionString: isProduction ? process.env.DATABASE_URL : connectionString
})

exports.getUsers = function getUsers(username) {
	return pool.query('SELECT * FROM users WHERE username = $1',[username])
}

exports.insertSession = function insertSession(userId, sessionkey) {
	return pool.query(`INSERT INTO sessions (userid, sessionkey)
		VALUES ($1, $2)`, [userId, sessionkey])
}

exports.insertUser = function insertUser(username, hashedPassword) {
	return pool.query(`INSERT INTO users (username, password) VALUES ($1, $2)`, [username, hashedPassword])
}

