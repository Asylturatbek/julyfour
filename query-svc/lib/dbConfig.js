const config = require('./util-config.js')
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${config.config.db.user}:${config.config.db.password}@${config.config.db.host}:${config.config.db.port}/${config.config.db.database}`
const pool = new Pool({
	connectionString: isProduction ? process.env.DATABASE_URL : connectionString
})

exports.getConfigs = function getConfigs(userId) {
	return pool.query(`SELECT id, isglobal as "isGlobal", userid as "userId",
		 configkey as "configKey", configvalue as "configValue" FROM configs WHERE userid = $1`,[userId])
}

exports.getGlobalConfigs = function getGlobalConfigs() {
	return pool.query(`SELECT id, isglobal as "isGlobal", userid as "userId",
		 configkey as "configKey", configvalue as "configValue" FROM configs WHERE userid is NULL`)
}

exports.deleteOldSessions = function deleteSession() {
	return pool.query("DELETE FROM sessions WHERE createddate < NOW() - INTERVAL '10 minutes'")
}

exports.getSessions = function getSessions(sessionkey) {
	return pool.query('SELECT * FROM sessions WHERE sessionkey = $1',[sessionkey])
}