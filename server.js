const express = require('express');
const cluster = require('cluster');

const app = express();

const PORT = 2020;

function delay(delayInMs) {
    const startTime = Date.now();
    while (Date.now() - startTime < delayInMs) {
        //do nothing and delay the response
        // event loop is blocked
    }
}

app.get('/', (req, res) => {
    res.send(`Main Route ${process.pid}`);
});

app.get('/timer', (req, res) => {
    delay(9000);
    res.send(`Timer executed ${process.pid}`);
});

console.log('Running server.js...');

// since event loop gets blocked ,
// Clusters of Node.js processes can be used to run multiple
// instances of Node.js that can distribute workloads among their application threads

if (cluster.isMaster) {
    console.log('Master Process has been started');
    // fork creates workers
    cluster.fork();
    cluster.fork();
} else {
    // divide incoming requests with worker
    //  workers have same server code
    console.log('Worker Process has been started');
    app.listen(PORT, () => {
        console.log(`Started on PORT : ${PORT}`);
    });
}
