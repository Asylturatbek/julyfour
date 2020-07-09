const config = require('./../util-config.js')
var PROTO_PATH = __dirname + '../../../msdata/auth-svc/data/grpc/auth.proto';
const log = require('./../util-log.js')

exports.init = async function() {
    start()
}

function start(){
    // log.info('okay seems like info level')
    // log.debug('Everything is working fine young man')
    // log.warn('welll welll well')
    // log.trace('lets see')

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

    const register = require('./services/register.js')
    const authenticate = require('./services/authenticate.js')

    server.addService(packageObject.AuthService.service, {
        'Register': register,
        'Authenticate': authenticate
    })

    server.bind(`${config.config.api.host}:${config.config.api.port}`,
        grpc.ServerCredentials.createInsecure())

    log.info(`server running at ${config.config.api.host}:${config.config.api.port}`)
    server.start()   
}
