import  { WebSocketServer, WebSocket} from 'ws';

const wss = new WebSocketServer({ port: 8080 });

// connection Event
wss.on('connection', (socket, request) => {
    const ip = request.socket.remoteAddress;

    socket.on("message", (rwaData) => {
        const message = rwaData.toString()
        console.log({ rwaData });

        wss.clients.forEach((client) =>{
            if(client.readyState === WebSocket.OPEN) client.send("sever broadcast:" + message);
        })
    });

    socket.on("error", (err) => {
        console.log("error: " + err.message + " : " + ip);
    });

    socket.on("close", () => {
        console.log("Client disconnected");
    })
});

console.log("webSocket Server is live on ws://localhost:8080");