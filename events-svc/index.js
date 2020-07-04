const config = require('./msdata/events-svc/data/config/config.js')
const {logger} = require('./lib/winston.js')
const PROTO_PATH = __dirname + '/msdata/events-svc/data/grpc/events.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {})

const packageObject = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

const handleChangeConfigStatus = require('./lib/grpc/services/handleChangeConfigStatus.js')
const {handleStream} = require('./lib/grpc/services/handleStream.js')

server.addService(packageObject.EventsService.service, {
	"Status": handleStream,
	"ConfigChangeStatus": handleChangeConfigStatus
});

server.bind(`${config.api.host}:${config.api.port}`,
	grpc.ServerCredentials.createInsecure())

logger.info(`Server is running at ${config.api.host}:${config.api.port}`)
server.start()