const grpc = require('grpc')

const protoLoader = require('@grpc/proto-loader');
var PROTO_PATH = __dirname + '/../msdata/operation-svc/data/grpc/operation.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const packageObject = grpc.loadPackageDefinition(packageDefinition)

const OperationService = packageObject.OperationService

const client = new OperationService('localhost:70071',
	grpc.credentials.createInsecure())



module.exports = client