const db = require('./../../dbConfig.js')
const bcrypt = require('bcrypt')
const grpc = require('grpc')
const log = require('./../../util-log.js')

module.exports = async function(call, callback) {
	log.trace('Incoming request for register')
	const {username, password} = call.request

	try {
		if(!username || !password){
			callback(null, {success:false, error:{code:grpc.status.INVALID_ARGUMENT, data:'argument is missing'}})
		}
		//db.getUsers
		const users = await db.getUsers(username)
		
		if (users.rows.length>0){
			callback(null, {success:false, error:{code:grpc.status.ALREADY_EXISTS, data:'there is already user with this username'}})
		} else {
			const hashedPassword = await bcrypt.hash(password, 10)
			//db.insertUser
			await db.insertUser(username, hashedPassword)
			log.trace('Successfully registered user with username ' + username) 
			callback(null, {success:true, error:{code:null, data:null}})
		}
	} catch (err) {
		callback(null, {success:false, error:{code:grpc.status.INTERNAL, data:'internal server error'}})
		log.error(err)
	}

}