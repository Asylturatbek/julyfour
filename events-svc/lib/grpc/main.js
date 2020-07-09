const config = require('./../util-config.js')
const log = require('./../util-log.js')
const PROTO_PATH = __dirname + '../../../msdata/events-svc/data/grpc/events.proto';

exports.init = async function(){
	start()
}


function start(){
	const grpc = require('grpc');
	const protoLoader = require('@grpc/proto-loader');
	const packageDefinition = protoLoader.loadSync(PROTO_PATH, {})

	const packageObject = grpc.loadPackageDefinition(packageDefinition)

	const server = new grpc.Server()

	const handleChangeConfigStatus = require('./services/handleChangeConfigStatus.js')
	const {handleStream} = require('./services/handleStream.js')

	server.addService(packageObject.EventsService.service, {
		"Status": handleStream,
		"ConfigChangeStatus": handleChangeConfigStatus
	});

	server.bind(`${config.config.api.host}:${config.config.api.port}`,
		grpc.ServerCredentials.createInsecure())

	log.info(`Server is running at ${config.config.api.host}:${config.config.api.port}`)
	server.start()
}
