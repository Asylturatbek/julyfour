const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
var grpc = require('grpc');
const db = require('./../../dbConfig.js')

module.exports = async function(call, callback){

	const {username, password} = call.request

	try {
		if(!username || !password){
			callback(null, {success:false, error:{code:grpc.status.INVALID_ARGUMENT, data:'argument is missing'}})
		}
		//db.getUsers
		const users = await db.getUsers(username)
		
		if (users.rows.length>0) {
			const user = users.rows[0]
			const isMatch = await bcrypt.compare(password, user.password)
			if(isMatch){
				const session_key = uuidv4();
				//db.insertSession
				await db.insertSession(user.id, session_key)
				
				callback(null, {success:true, error:{code:null, data:null}, sessionKey:session_key})
			} else {
				callback(null, {success:false, error:{code:grpc.status.INVALID_ARGUMENT, data:'passwords do not match'}})
			}
		} else {
			callback(null, {success:false, error:{code:grpc.status.INVALID_ARGUMENT, data:'email is not registered'}})
		}
	} catch (err) {
		callback(null, {success:false, error:{code:grpc.status.INTERNAL, data:'internal server error'}})
		console.error(err)
	}

}