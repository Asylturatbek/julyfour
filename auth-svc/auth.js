const config = require('./msdata/auth-svc/data/config/config.js')
var PROTO_PATH = __dirname + '/msdata/auth-svc/data/grpc/auth.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const packageObject = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

const register = require('./lib/grpc/services/register.js')
const authenticate = require('./lib/grpc/services/authenticate.js')

server.addService(packageObject.AuthService.service, {
	'Register': register,
	'Authenticate': authenticate
})

server.bind(`${config.api.host}:${config.api.port}`,
	grpc.ServerCredentials.createInsecure())

console.log(`server running at ${config.api.host}:${config.api.port}`)
server.start()