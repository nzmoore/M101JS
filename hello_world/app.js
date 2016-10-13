var express = require('express'),
    app = express();

app.get("/", function(req, res) {
    res.send("Hello there from Express");
});

app.use(function(req,res) {
   res.sendStatus(404);
});

var server = app.listen(3030, function() {
   var port = server.address().port;
   console.log("Express server listening on port %s", port);
}); 