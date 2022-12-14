const express = require('express');

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
    delay(4000);
    res.send(`Timer executed ${process.pid}`);
});

// since event loop gets blocked ,
// Clusters of Node.js processes can be used to run multiple
// instances of Node.js that can distribute workloads among their application threads

// if (cluster.isMaster) {
//     console.log('Master Process has been started');
//     // fork creates workers
//     // maximizing the performance of our server based on the amount of CPU cores in our machine.
//     const NUM_OF_WORKERS = os.cpus().length;
//     for (i = 0; i < NUM_OF_WORKERS; i++) {
//         cluster.fork();
//     }
// } else {
//     // divide incoming requests with worker
//     //  workers have same server code
//     console.log('Worker Process has been started');
//     app.listen(PORT, () => {
//         console.log(`Started on PORT : ${PORT}`);
//     });
// }

app.listen(PORT, () => {
    console.log(`Started on PORT : ${PORT}`);
});
