var express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    engines = require('consolidate');
    
    app.engine("html", engines.nunjucks);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    
    MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {
    
      assert.equal(null, err);
      console.log('db connected');

       app.get("/", function(req, res) {
       res.render('hello', {'name': 'Templates'} );
       });
       
       app.get("/movies", function(req, res) {
          db.collection('movies').find({}).toArray(function(err, docs) {
              res.render('movies', {'movies': docs } );
          });
       
       });
       
       app.use(function(req,res) {
       res.sendStatus(404);
       });

       var server = app.listen(3030, function() {
       var port = server.address().port;
       console.log("Express server listening on port %s", port);
       }); 
     });  
