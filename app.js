var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.use('/build', express.static('./build'));
app.use('/', express.static(__dirname + '/app'));


app.listen(port, function () {
    'use strict';
     console.log('magic happen there ' + port);
});
