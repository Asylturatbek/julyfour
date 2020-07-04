const client = require('./client.js')

let givenUserId = process.argv[2]
let givenIsGlobal = process.argv[3]
if(givenIsGlobal == 'false') givenIsGlobal = false

const data = {
	userId: givenUserId,
	isGlobal: givenIsGlobal
}

console.log(data)

client.ConfigChangeStatus(data, (err, response) => {
	if(!err) {
		console.log(response)
	} else {
		console.error({code: err.code, metadata: err.metadata, details: err.details})
	}
})