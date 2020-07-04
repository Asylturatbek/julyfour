const { usersInChat } = require('./handleStream.js')
const {logger} = require('./../../winston.js')
const grpc = require('grpc')

module.exports = async function(call, callback){
	logger.info('received request for handleChangeConfigStatus')
	try {
			const {userId, isGlobal} = call.request
			
			if(userId !=='' && isGlobal !=='') {

				//will check if the change is global or not
				if(isGlobal){
					usersInChat.forEach(user => user.callFromStream.write({message:'Global configs have changed'}))
				} else {
					const personToSend = usersInChat.filter(user => {
						return user.userId == userId
					})
					personToSend.forEach(user => user.callFromStream.write({message: 'Individual configs have changed'}))
				}
				callback(null, {success: true, error:{code:null, data: null}})
			} else {
				callback(null, {success:false, error:{code:grpc.status.INVALID_ARGUMENT, data:'argument is missing'}})
			}

	} catch(err) {
		callback(new Error("Internal server error"));
		logger.error('%o', err)
	}
}