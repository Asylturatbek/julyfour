const client = require('./client.js')

let givenGlobal = process.argv[2]
let givenUserId = process.argv[3]
const givenConfigKey = process.argv[4]
const givenConfigValue = process.argv[5]

if(givenGlobal == 'false') givenGlobal = false
if(givenUserId == 'null') givenUserId = null

const data = {
	isGlobal: givenGlobal,
	userId: givenUserId,
	configKey: givenConfigKey,
	configValue: givenConfigValue
}

console.log(data)

client.AddConfig(data, (err, response) => {
	if(!err) {
		console.log(response)
	} else {
		console.error({code: err.code, metadata: err.metadata, details: err.details})
	}
})