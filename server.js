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
    res.send('Main Route :)');
});

app.get('/timer', (req, res) => {
    delay(9000);
    res.send('Timer executed');
});

app.listen(PORT, () => {
    console.log(`Started on PORT : ${PORT}`);
});
