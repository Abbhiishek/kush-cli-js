# KushCLI
KushCLI is a command-line interface tool for facilitating real-time communication using WebSocket technology. With KushCLI, you can easily create or join WebSocket rooms and communicate with other users in real-time.

## Installation
To install KushCLI, you can use npm. Make sure you have Node.js installed on your system.

```bash
npm install -g @abhishekkushwaha/kush-cli
```
## Usage

### Options
```
-u, --url <url>: Specify the URL of the WebSocket server. If not provided, the default URL http://localhost:3000 will be used.
-r, --room <roomId>: Specify the room ID to join or create.
-c, --create: Create a new room.
-j, --join: Join an existing room.
-n, --name <name>: Provide your name for identification in the chat room.
```


### Flow

Connecting to the WebSocket Server: KushCLI connects to the WebSocket server specified by the -u option. If not provided, it defaults to http://localhost:3000.

- `Options Validation`: KushCLI validates the provided options and ensures that either a room ID (-r), room creation (-c), or room joining (-j) option is specified. Additionally, it checks if the user's name is provided using the -n option.

- `Room Creation or Joining`: Depending on the specified options, KushCLI either creates a new room or joins an existing room.
If the -c option is provided, KushCLI emits a createRoom event to the server to create a new room.
If the -j option is provided along with a room ID, KushCLI emits a join event with the room ID to join the specified room.

- `Real-time Communication`: Once connected to the room, KushCLI enables real-time communication with other users in the room. Users can send and receive messages using the command line interface.
Messages sent by the user are emitted to the server with the message event, including the user's name, room ID, and message text.
Messages received from other users in the room are displayed in the command line interface.

- `Graceful Termination`: KushCLI listens for the SIGINT signal (Ctrl+C) to gracefully exit the room. Upon termination, KushCLI emits a leave event to inform the server that the user has left the room.

