var WebSocketServer = require('ws').Server
  , wss             = new WebSocketServer({ port: 9446 });

wss.on( 'connection', function connection ( ws ) {
    ws.on( 'message', function incoming ( msg ) {
        console.log('received: %s', msg);
        ws.send( 'server message :: ' + msg );
    });

    ws.send( 'something' );
});

console.log( 'listening on 0.0.0.0:9446' );
