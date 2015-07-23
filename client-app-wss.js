var fs          = require( 'fs' )
  , path        = require( 'path' )
  , https       = require( 'https' )
  , privateKey  = fs.readFileSync( 'cert/key.pem', 'utf8' )
  , certificate = fs.readFileSync( 'cert/cert.pem', 'utf8' )
  , credentials = { key: privateKey, cert: certificate };


var httpsServer = https.createServer( credentials, function (req, res) {
    var file = fs.readFileSync( path.join( __dirname,'index.html' ) );
    res.writeHead(200);
    res.end( file );
});
httpsServer.listen( 9446 );


var WebSocketServer = require( 'ws' ).Server
  , wss             = new WebSocketServer({ server: httpsServer });

wss.on( 'connection', function connection ( ws ) {
    ws.on( 'message', function incoming ( msg ) {
        console.log( 'received: %s', msg );
        ws.send( 'server message :: ' + msg );
    });

    ws.send( 'something' );
});
