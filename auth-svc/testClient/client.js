const grpc = require('grpc')

const protoLoader = require('@grpc/proto-loader');
var PROTO_PATH = __dirname + '/../msdata/auth-svc/data/grpc/auth.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const packageObject = grpc.loadPackageDefinition(packageDefinition)

const AuthService = packageObject.AuthService

const client = new AuthService('localhost:50051',
	grpc.credentials.createInsecure())



module.exports = client