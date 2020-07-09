const db = require('./../../dbConfig.js')
const grpc = require('grpc')
const log = require('./../../util-log.js')
const {sendToEventsSvc} = require('./../sendToEvents-svc.js')

module.exports = async function(call, callback) {
	log.trace('received request for updateConfig')
	try {
			const {id, configValue} = call.request
			
			if(id && configValue) {
				const {rows: configs} = await db.updateConfig(configValue, id)


				log.trace('sending about change to events svs')
				sendToEventsSvc({userId: configs[0].userid, isGlobal: configs[0].isglobal})

				//will check if the change is global or not
				// if(configs[0].isglobal){
				// 	usersInChat.forEach(user => user.callFromStream.write({message:'Global configs have changed'}))
				// } else {
				// 	const personToSend = usersInChat.filter(user => {
				// 		return user.userId == configs[0].userid
				// 	})
				// 	personToSend.forEach(user => user.callFromStream.write({message: 'Individual configs have changed'}))
				// }


				callback(null, {success: true, error:{code:null, data: null}})
			} else {
				callback(null, {success:false, error:{code:grpc.status.INVALID_ARGUMENT, data:'argument is missing'}})
			}

	} catch(err) {
		callback(new Error("Internal server error"));
		log.error(err)
	}
}