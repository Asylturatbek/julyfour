const client = require('./client.js')

const givenUsername = process.argv[2]
const givenPassword = process.argv[3]

const user = { username: givenUsername, password: givenPassword }
client.Register(user, (err, response) => {
	if(!err) {
		console.log('received response from server for registration')
		console.log(response)
	} else {
		console.error(err)
	}
})