const { Command } = require('commander');
const io = require('socket.io-client');

const program = new Command();

program
    .option('-u, --url <url>', 'Socket server URL')
    .option('-r, --room <roomId>', 'Room ID')
    .option('-c, --create', 'Create a new room')
    .option('-j, --join', 'Join an existing room')
    .option('-n, --name <name>', 'User name');

program.parse(process.argv);

const options = program.opts();


if (!options.room && !options.create && !options.join) {
    console.error('Error: Please specify a room ID or use --create or --join.');
    process.exit(1);
}

if (!options.name) {
    console.error('Error: Please provide your name using the --name option.');
    process.exit(1);
}

const socket = io(options.url);

socket.on('connect', () => {
    console.log('Connected to socket server');

    if (options.create) {
        socket.emit('createRoom'); // Create a new room
        console.log('Creating new room...');
    } else if (options.join) {
        if (!options.room) {
            console.error('Error: Please provide a room ID to join.');
            process.exit(1);
        }
        socket.emit('join', options.room, options.name); // Join an existing room
        console.log(`Joining room: ${options.room}`);
    } else {
        socket.emit('join', options.room); // Join the specified room
        console.log(`Joining room: ${options.room}`);
    }

    socket.on('roomCreated', (roomId) => {
        console.log(`Room created with ID: ${roomId}`);
        console.log(`share the roomid: ${roomId} to friends to join the room`);
    });

    socket.on('message', ({ name, text }) => {
        console.log(`➡️ ${name}: ${text}`);
    });

    process.stdin.on('data', (data) => {
        const message = data.toString().trim(); // Trim whitespace and newlines

        if (message) {
            socket.emit('message', { room: options.room, name: options.name, text: message }); // Send message to the room
        }
    });
});

// Handle Ctrl+C to gracefully exit
process.on('SIGINT', () => {
    console.log('\nTerminating room...');
    socket.emit('leave', options.room); // Leave the room
    process.exit();
});