const client = require('./client.js')
const grpc = require('grpc')

const givenSessionKey = process.argv[2]

if(givenSessionKey){
	var meta = new grpc.Metadata();
	meta.add('sessionKey', givenSessionKey);
}

client.ListConfigs({}, meta, (err, configs) => {
	if(!err) {
		console.log(configs)
	} else {
		console.error({code: err.code, metadata: err.metadata, details: err.details})
	}
})