const grpc = require('grpc')

const protoLoader = require('@grpc/proto-loader');
var PROTO_PATH = __dirname + '/../msdata/query-svc/data/grpc/config.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const packageObject = grpc.loadPackageDefinition(packageDefinition)

const ConfigService = packageObject.ConfigService

const client = new ConfigService('localhost:60061',
	grpc.credentials.createInsecure())



module.exports = client