const winston = require('winston')
//creating logger and configuring it
const fs = require('fs');
const path = require('path')
// const winston = require('../');
const { createLogger, format, transports } = winston;


const logger = createLogger({
  format: format.combine(
   format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp(),
    format.colorize(),
    format.simple()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.prettyPrint(),
        format.splat(),
        format.align(),
        format.printf( msg => {
          return `[${msg.timestamp}] - ${msg.level} [${msg.label}]: ${msg.message}`
        })
      ),
      level: 'silly'
    }),
    new transports.Stream({
      stream: fs.createWriteStream('./example.log')
    })
  ]
})


// { 
//   error: 0, 
//   warn: 1, 
//   info: 2, 
//   http: 3,
//   verbose: 4, 
//   debug: 5, 
//   silly: 6 
// }


// const options = {
// 	file: {
// 		level: 'info',
// 		filename: './../logs/app.log',
// 		handleExceptions: true,
// 		json: true,
// 		maxsize: 5242880, //5mb
// 		maxFiles: 5,
// 		colorize: false,
// 	},
// 	console: {
// 		level: 'debug',
// 		handleExceptions: true,
// 		json: false,
// 		colorize: true,
// 	}
// }


// let logger = winston.createLogger({
// 	level: 'info',
// 	format: winston.format.combine(
// 		winston.format.splat(),
// 		winston.format.timestamp(),
// 		winston.format.printf(info => {
// 			return `${info.level}: ${info.message} ${info.timestamp}`
// 		})),
// 	transports: [
// 	    new winston.transports.File({ filename: './../error.log', level: 'error' }),
// 	    new winston.transports.File(options.file),
// 	]
// })

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console(
//   	{
// 		level: 'debug',
// 		handleExceptions: true,
// 		json: false,
// 		colorize: true,
// 	}
//   // {
//   //   format: winston.format.simple(),
//   // }
//   ));
// }

exports.logger = logger