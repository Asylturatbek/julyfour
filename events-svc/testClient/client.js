const grpc = require('grpc')

const protoLoader = require('@grpc/proto-loader');
var PROTO_PATH = __dirname + '/../msdata/events-svc/data/grpc/events.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const packageObject = grpc.loadPackageDefinition(packageDefinition)

const EventsService = packageObject.EventsService

const client = new EventsService('localhost:80081',
	grpc.credentials.createInsecure())



module.exports = client