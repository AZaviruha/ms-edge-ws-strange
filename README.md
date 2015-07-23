This repository contains code, that reproduces strange behavior in MS
Edge, described [here][stackoverflow]

In short, when you call `new WebSocket` in MS Edge, it does not
generate exception, when you call it with wrong host argument.

```javascript
    var socket, path;
    var hosts = ['localhost', '127.0.0.1'];

    for (var i in hosts) {
        path = 'ws://'+hosts[i]+':9446';
        console.log( '===> Tested path :: ', path );
        try {
            socket = new WebSocket( path );
            break;
        }
        catch ( e ) {
            // !!! Never shown !!!
            console.error( '===> WebSocket creation error :: ', e );
        }
    }
```

Becouse of this, you can't "retry" to connect with different hosts.

By the way, "localhost" works for "wss://", and "127.0.0.1" works for
"ws://" :)


To reproduce this for "ws://":
1. run `node index.js` to run static server.
2. run `node client-app-ws.js` to run web-socket server.
3. open http://127.0.0.1:3000 in MS Edge and press F12 to see error in
   developer tools.

To reproduce this for "wss://":
1. run `node client-app-wss.js` to run secure web-socket server.
2. open http://127.0.0.1:9446 in MS Edge and open "insecure" page with
   untrusted cert.
3. press F12 to see error in developer tools.

[docs-image]: http://stackoverflow.com/questions/31541102/microsoft-edge-does-not-allow-localhost-loopback-for-websockets
