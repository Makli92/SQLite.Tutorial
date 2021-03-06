var config = require('cloud-env')

var express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://DonMakli:Fivoulis92%5E%5E@cluster0-shard-00-00-cvacf.mongodb.net:27017,cluster0-shard-00-01-cvacf.mongodb.net:27017,cluster0-shard-00-02-cvacf.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
var db;

MongoClient.connect(uri, (err, client) => {
  if (err) throw err;
  db = client.db("test");
});

app.get('/chapters', (request, response) => {
  const chapters = db.collection("chapters");
  
  var sort = {order: 1};
    chapters.find().sort(sort).toArray(function(err, result) {
      if (err) throw err;
      response.send(JSON.stringify(result));
    });

})

app.listen(config.PORT, config.IP, function () {
  console.log("Listening on "+config.IP+", port "+config.PORT)
});