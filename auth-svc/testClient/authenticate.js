const client = require('./client.js')

const givenUsername = process.argv[2]
const givenPassword = process.argv[3]

client.Authenticate({ username: givenUsername, password: givenPassword }, (err, response) => {
	if(!err) {
		console.log('received response from server for authentication')
		console.log(response)
	} else {
		console.error(err)
	}
})