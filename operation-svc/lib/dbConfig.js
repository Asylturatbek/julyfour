const config = require('./../msdata/operation-svc/data/config/config.js')
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`
const pool = new Pool({
	connectionString: isProduction ? process.env.DATABASE_URL : connectionString
})

exports.insertConfig = function insertConfig(isGlobal, userId, configKey, configValue) {
	return pool.query(`INSERT INTO configs (isglobal, userid, configkey, configvalue)
			 VALUES ($1, $2, $3, $4)`, [isGlobal, userId, configKey, configValue])
}

exports.updateConfig = function updateConfig(configValue, id) {
	return pool.query(`UPDATE configs SET configvalue = ($1) WHERE id = ($2) RETURNING *`, [configValue, id])
}