const config = require('./../util-config.js')
const log = require('./../util-log.js')
const PROTO_PATH = __dirname + '../../../msdata/query-svc/data/grpc/config.proto';

exports.init = async function(){
	start()
}

function start(){

	const grpc = require('grpc');
	const protoLoader = require('@grpc/proto-loader');
	const packageDefinition = protoLoader.loadSync(PROTO_PATH, {})

	const packageObject = grpc.loadPackageDefinition(packageDefinition)

	const server = new grpc.Server()


	const listConfigs = require('./services/listConfigs.js')

	server.addService(packageObject.ConfigService.service, {
		'ListConfigs': listConfigs
	})

	server.bind(`${config.config.api.host}:${config.config.api.port}`,
		grpc.ServerCredentials.createInsecure())

	log.info(`Server is running at ${config.config.api.host}:${config.config.api.port}`)
	server.start()
}
