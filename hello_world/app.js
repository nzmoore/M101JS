var express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    bodyParser = require('body-parser'),
    engines = require('consolidate');
    
    app.engine("html", engines.nunjucks);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({ extended: true })); 
    
    // Handler for internal server errors
    function errorHandler(err, req, res, next) {
       console.error(err.message);
       console.error(err.stack);
    res.status(500).render('error-template', { error: err });
    }
    
   
    
    MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {
    
      assert.equal(null, err);
      console.log('db connected');

       app.get("/", function(req, res, next) {
       res.render('hello', {'name': 'Templates'} );
       });
       
       app.get("/testErrorTemplate", function(req, res, next) {
        next("Some other error text");
       });
       
       app.get("/movies", function(req, res, next) {
          db.collection('movies').find({}).toArray(function(err, docs) {
              res.render('movies', {'movies': docs } );
          });
       
       });
       
       app.get("/addMovies", function(req, res, next) {
              var messageText = " "; 
              res.render('addMovies', { "message": messageText } );
        
       
       });
       
       app.post("/addMovie", function(req, res, next) {
              
              var messageText = " ";
              var title = req.body.title; 
              var year = req.body.year;
              var id = req.body.imdb;
              var addData = true;
              var result;
              
            var addCallback = function addMovieCallback(err, result) {
                  assert.equal(null, err);
                  messageText = "Movie added " + title + " " + year + " " + id ; 
                  console.log("add callback");
                  console.log(result);
                  res.render('addMovies', { "message": messageText } );
              };
            
              
              if (!title) {
     			   messageText = "Enter a title! ";
     			   addData = false;
   			  };
            
              if (!year) {
     			   messageText = messageText + "Enter a year! ";
     			   addData = false;
   			  };
   			  
   			  if (!id) {
     			   messageText = messageText + "Enter an IMDB ID! ";
     			   addData = false;
   			  };
               
              if (addData) {
                  
                db.collection('movies').insertOne(
                {"title": title, "year": year, "imdb": id},
                function(err, result) {
                    assert.equal(null, err);
                    messageText = "Movie added " + title + " " + year + " " + id ; 
                    console.log("add callback");
                    console.log(result);
                    res.render('addMovies', { "message": messageText } );
                }
                );
              }
              else {
                res.render('addMovies', { "message": messageText } ); 
              };    
              
               
              
       });
       
       app.get("/showvars", function(req, res, next) {
         var showvars = "Junk";
         var reqVar = req.query;
         // console.log("Params is " req.params);
         
         for (var prop in reqVar) {
            console.log("This reqVar." + prop + " = " + reqVar[prop]);
         }
         res.render('showvars', {'name': showvars,'params': reqVar});
          
       });
       
       app.get("/:allothers", function(req, res, next) {
          var aRoute = req.params.allothers;
          next("Route " + aRoute +  " not found");
       });
       
       app.use(errorHandler);
       

       var server = app.listen(3030, function() {
       var port = server.address().port;
       console.log("Express server listening on port %s", port);
       }); 
     });  
