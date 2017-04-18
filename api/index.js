var http = require('http'),
    express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    bodyParser = require('body-parser');

var app = express();
app.set('port', process.env.PORT || 3000);


var mongoHost = 'localHost'; //A
var mongoPort = 27017;

app.use(bodyParser.json())


var url = 'mongodb://localhost:27017/openwater';
var mdb = null;

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  mdb = db

});

app.get('/')

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
