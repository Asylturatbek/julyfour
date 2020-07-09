const verifySession = require('./../verify.js')
const log = require('./../../util-log.js')

let usersInChat = []

const handleStream = async (call) => {
	try{
		log.trace(`User has joined`)

		call.on('cancelled', () => {
			log.trace('one user has left')
			usersInChat = usersInChat.filter(user => user !== call)
		})
		const result = await verifySession(call)

		if(result.success) {
			const person = {
				userId: result.data.userid,
				callFromStream: call
			}
			usersInChat.push(person)
			// console.log(usersInChat)
		} else {
			call.write({message: 'You are not allowed my men! Give me valid session key'})
			call.end()
		}
	}catch(err) {
		console.error(err)
	}


}


module.exports = {handleStream, usersInChat}