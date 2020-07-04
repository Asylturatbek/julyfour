const db = require('./../../dbConfig.js')
const verifySession = require('./../verify.js')

const {logger} = require('./../../winston.js')

module.exports = async function (call, callback) {
	logger.info("Received request for listConfigs")
	try{
		const result = await verifySession(call)

		// logger.debug('%o', result)
		// logger.info("Hello %s %o", "World", { x: "y" });
		// logger.warn('Warning message coming your way')
		// logger.error('Error message here')
		// logger.debug('okay debug moooode')
		// logger.silly('silly mode is on baby')
		// logger.http('what does it do evn here')
		// logger.verbose('okay lets see what verbose does')
		// logger.profile('testing')
		// 
		if(result.success){
			logger.info('Session verified. Sending configs...')
			const id = result.data.userid
			const { rows: configs } = await db.getConfigs(id)
			if(configs.length>0){
				callback(null, { "configs": configs})
			} else {
				const globalConfigs = await db.getGlobalConfigs()
				callback(null, { "configs": globalConfigs.rows})
			}		

		} else {
			callback(new Error(result.data));
		}
		
	} catch (err) {
		callback(new Error("Internal server error"));
		logger.error('%o', err)
	}
}