var path = require('path');
var express = require('express');
var routes = require('./routes/index.jsx');
var SpotifyWebApi = require('spotify-web-api-node');

var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var spotifyRedirect = null;

switch (process.env.ENV) {
  case 'Production':
  break;
  case 'Development': 
    spotifyRedirect = 'http://localhost:8080';
  break;
}

// var client_id = 'ceb9be711d7d46d8bdec35c613d38016'; // Your client id
// var client_secret = '655b744453bb4c05867d29aba824a9f5'; // Your secret


var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your client id
var redirect_uri = process.env.REDIRECT_URI + '/callback'; // Your redirect uri

// console.log(client_id);

var spotifyApi = new SpotifyWebApi({
  clientId : client_id,
  clientSecret : client_secret,
  redirectUri: redirect_uri
});

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};




var app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(cookieParser());

app.use(routes);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});

var stateKey = 'spotify_auth_state';


app.get('/login', function(req, res) {

  var state = generateRandomString(16);

  res.cookie(stateKey, state);

  var spotifyAuth = 'https://accounts.spotify.com/authorize?';


  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect(spotifyAuth +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    spotifyApi.authorizationCodeGrant(code)
    .then(function(data) {

      // Set the access token and refresh token
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);


      res.redirect((spotifyRedirect ? spotifyRedirect : process.env.REDIRECT_URI) + '/spotify/?' + querystring.stringify({
        access_token: data.body['access_token']
      }));

      // Save the amount of seconds until the access token expired
      // tokenExpirationEpoch = (new Date().getTime() / 1000) + data.body['expires_in'];
      //console.log('Retrieved token. It expires in ' + Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) + ' seconds!');
    }, function(err) {
      console.log('Something went wrong when retrieving the access token!', err.message);
    });

  }

 
});



/**
 * This example retrives an access token using the Client Credentials Flow. It's well documented here:
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

/*
 * https://developer.spotify.com/spotify-web-api/using-scopes/
 */

 /**
 * Set the credentials given on Spotify's My Applications page.
 * https://developer.spotify.com/my-applications
 */
// var spotifyApi = new SpotifyWebApi({
//   clientId : 'ceb9be711d7d46d8bdec35c613d38016',
//   clientSecret : '655b744453bb4c05867d29aba824a9f5',
// });

// // Retrieve an access token
// spotifyApi.clientCredentialsGrant()
//   .then(function(data) {
//     console.log('The access token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);

//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//   }, function(err) {
//     console.log('Something went wrong when retrieving an access token', err.message);
//   });
