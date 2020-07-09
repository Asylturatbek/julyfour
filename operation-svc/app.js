var config = require('./lib/util-config.js');
var log = require('./lib/util-log.js');
var api = require('./lib/grpc/main');
// var dmzdb = require('./lib/db-dmz.js');

var path = require('path');
var fs = require('fs');

// Обработчики глобальных событий
process.on('uncaughtException', uncaughtHandler);
process.on('SIGINT', preCleanup);
process.on('SIGUSR1', preCleanup);
process.on('SIGUSR2', preCleanup);

// Инициализация подсистем
(async () => {
    try {
        await config.init();
        await log.init();
        // await dmzdb.init();
        await api.init();

    } catch (err) {
        console.log("Ошибка при инициализации сервиса: " + (err.stack || err));
        preCleanup();
    }
})();


function uncaughtHandler(err) {
    var msg = "Необработанная ошибка";
    // log.error(msg, err);
    console.log(err)
}

function preCleanup() {
    console.log("cleanup...");

    config.isShutdown = true;
    setTimeout(cleanup, 2000);
}

//exports.commitSuicide = preCleanup();

function cleanup() {

    /*
    if (dmzdb && dmzdb.dbConn) {
        dmzdb.dbConn.close();
    }
    */

    let files = fs.readdirSync(config.tempFolder).filter(function(file) {
        let fpath = path.join(config.tempFolder, file);
        if (!fs.lstatSync(fpath).isDirectory()) return file;
    })

    for (let f=0; f<files.length; f++) {
        fs.unlinkSync(path.join(config.tempFolder, files[f]));
    }

    setTimeout(function() {
        console.log('exiting...');
        process.exit(1);
    }, 3000);
}