const client = require('./client.js')
const grpc = require('grpc')

const givenSessionKey = process.argv[2]

if(givenSessionKey){
	var meta = new grpc.Metadata();
	meta.add('sessionKey', givenSessionKey);
}

const Stream = client.Status({}, meta)

Stream.on('data', data => {
	console.log(data)
})