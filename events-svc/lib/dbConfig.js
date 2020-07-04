const config = require('./../msdata/events-svc/data/config/config.js')
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`
const pool = new Pool({
	connectionString: isProduction ? process.env.DATABASE_URL : connectionString
})

exports.deleteOldSessions = function deleteSession() {
	return pool.query("DELETE FROM sessions WHERE createddate < NOW() - INTERVAL '10 minutes'")
}

exports.getSessions = function getSessions(sessionkey) {
	return pool.query('SELECT * FROM sessions WHERE sessionkey = $1',[sessionkey])
}