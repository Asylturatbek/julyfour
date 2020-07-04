const db = require('./../../dbConfig.js')
const grpc = require('grpc')
const {logger} = require('./../../winston.js')

module.exports = async function(call, callback) {
	logger.info('received request for insertConfig')
	try {
			const {isGlobal, userId, configKey, configValue} = call.request
			
			if(isGlobal!==undefined && userId!=='' && configKey && configValue) {
				await db.insertConfig(isGlobal, userId, configKey, configValue)
				callback(null, {success: true, error:{code:null, data: null}})
			} else {
				callback(null, {success:false, error:{code:grpc.status.INVALID_ARGUMENT, data:'argument is missing'}})
			}

	} catch(err) {
		callback(new Error("Internal server error"));
		logger.error('%o', err)
	}
}