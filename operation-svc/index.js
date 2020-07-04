const config = require('./msdata/operation-svc/data/config/config.js')
const {logger} = require('./lib/winston.js')
const PROTO_PATH = __dirname + '/msdata/operation-svc/data/grpc/operation.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {})

const packageObject = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

const addConfig = require('./lib/grpc/services/insertConfig.js')
const updateConfig = require('./lib/grpc/services/updateConfig.js')

server.addService(packageObject.OperationService.service, {
	'AddConfig': addConfig,
	'UpdateConfig': updateConfig
})

server.bind(`${config.api.host}:${config.api.port}`,
	grpc.ServerCredentials.createInsecure())

logger.info(`Server is running at ${config.api.host}:${config.api.port}`)
server.start()