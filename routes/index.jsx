var router = require('express').Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ReactRouter = require('react-router');
var path = require('path');

router.get('/', function(request, response) {
    response.sendFile(path.resolve('dist/index.html')); 
});

module.exports = router;