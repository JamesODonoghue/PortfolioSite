var router = require('express').Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ReactRouter = require('react-router');
var path = require('path');

router.get('/login', function(request, response) {

    console.log('hit!');
    response.redirect((process.env.BACKEND_URI || 'http://localhost:8080') + '/login'); 
});

router.get('/*', function(request, response) {
    response.sendFile(path.resolve('dist/index.html')); 
});

module.exports = router;