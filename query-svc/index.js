const config = require('./msdata/query-svc/data/config/config.js')
const {logger} = require('./lib/winston.js')
const PROTO_PATH = __dirname + '/msdata/query-svc/data/grpc/config.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {})

const packageObject = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()


const listConfigs = require('./lib/grpc/services/listConfigs.js')

server.addService(packageObject.ConfigService.service, {
	'ListConfigs': listConfigs
})

server.bind(`${config.api.host}:${config.api.port}`,
	grpc.ServerCredentials.createInsecure())

logger.info(`Server is running at ${config.api.host}:${config.api.port}`)
server.start()