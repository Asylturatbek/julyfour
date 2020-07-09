const config = require('./../util-config.js')
const log = require('./../util-log.js')
const PROTO_PATH = __dirname + '../../../msdata/operation-svc/data/grpc/operation.proto';

exports.init = async function(){
	start()
}

function start(){
	const grpc = require('grpc');
	const protoLoader = require('@grpc/proto-loader');
	const packageDefinition = protoLoader.loadSync(PROTO_PATH, {})

	const packageObject = grpc.loadPackageDefinition(packageDefinition)

	const server = new grpc.Server()

	const addConfig = require('./services/insertConfig.js')
	const updateConfig = require('./services/updateConfig.js')

	server.addService(packageObject.OperationService.service, {
		'AddConfig': addConfig,
		'UpdateConfig': updateConfig
	})

	server.bind(`${config.config.api.host}:${config.config.api.port}`,
		grpc.ServerCredentials.createInsecure())

	log.info(`Server is running at ${config.config.api.host}:${config.config.api.port}`)
	server.start()

}
