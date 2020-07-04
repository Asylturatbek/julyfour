const client = require('./client.js')

let givenId = process.argv[2]
const givenConfigValue = process.argv[3]

const data = {
	id: givenId,
	configValue: givenConfigValue
}

console.log(data)

client.UpdateConfig(data, (err, response) => {
	if(!err) {
		console.log(response)
	} else {
		console.error({code: err.code, metadata: err.metadata, details: err.details})
	}
})