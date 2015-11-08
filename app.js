const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;


app.use(bodyParser.json());

app.use('/build', express.static('./build'));
app.use('/', express.static(__dirname + '/app'));


app.listen(port, function () {
    'use strict';
    // console.log('Express server listening on port ' + port);
});
