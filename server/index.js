// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
// Get gist route
const api = require('./routes/api');
const app = express();

const helpers = require('./helper');
/**
 * Create HTTP server.
 */
const server = http.createServer(app);
// Socket.io for real time communication
var io = require('socket.io').listen(server);
var Player = require("./entities/player");
var Room = require("./entities/room");
var Game = require("./entities/game");
var Round = require("./entities/round");
var players = [];
var rooms = [new Room('Default')];
var cards = [];


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Point static path to dist
//app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
/*app.use('/api', api);*/

// Catch all other routes and return the index file
/*app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname, 'dist/index.html'));
 });*/

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4000';
app.set('port', port);


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

/*io.sockets.connected[socketId]*/
/**
 * Socket events
 */
io.sockets.on('connection', function (socket) {
    console.log('Socket connected');

    emitRooms();

    socket.on('createRoom', function (payload) {
        console.log(payload);
        if (payload['name'] === '') {
            emitError(socket, 'Please provide a name.');
            return true;
        }

        rooms.push(new Room(payload['name']));
        emitRooms();
    });

    socket.on('joinRoom', function (payload) {
        //console.log(socket);
        //console.log('player id:', socket.id);
        if (payload['id'] === '') {
            emitError(socket, 'Invalid Room provided.');
            return true;
        }


        var room = getRoom(payload['id']);
        var roomIndex = helpers.getIndexByKey('id', payload['id'], rooms);
        if (room) {
            if (payload['username'] === '') {
                emitError(socket, "Username missing.");
                return true;
            }

            var playerIndex = helpers.getIndexByKey('name', payload['username'], room.players);
            if(playerIndex === false){
                // for non returning player
                if (room.players.length >= 4) {
                    emitError(socket, "ROOM FULL");
                    return true;
                }
            }
            
            socket.join(payload['id']);


            //check if player already exists, add only if new.
            if (playerIndex === false) {
                var playerIndex = helpers.getIndexByKey('id', socket.id, room.players);
            }

            var player;

            if (playerIndex === false) {
                player = new Player(socket.id, payload.username);
                room.players.push(player);
            } else {
                player = room.players[playerIndex];
            }




            socket.in(room.id).broadcast.emit('userJoined', player);
            //socket.in(room.id).broadcast.emit('usersUpdated', player);

            socket.emit('clientUser', player);
            socket.emit('roomJoined', {
                room: room
            });

            //rooms[roomIndex] = room;

            console.log(rooms);

            emitRooms();
            // socket.emit('connectedUsers', {
            //     'players': players
            // });

        } else {
            emitError(socket, 'INVALID ROOM');
            return;
        }
    });

    socket.on('leaveRoom', function (payload) {
        if (payload['id'] === '') {
            emitError(socket, 'Invalid Room provided.');
            return true;
        }

        if (payload['player_id'] === '') {
            emitError(socket, 'Invalid Player provided.');
            return true;
        }


        var room = getRoom(payload['id']);
        var roomIndex = helpers.getIndexByKey('id', payload['id'], rooms);

        console.log('players', room.players, 'id', payload['player_id']);
        var playerIndex = helpers.getIndexByKey('id', payload['player_id'], room.players);
        if (playerIndex) {
            var player = room.players[playerIndex];
            socket.in(room.id).broadcast.emit('leftRoom', {
                player_id: payload['player_id'],
                player: player
            });

            if (playerIndex) {
                room.players.splice(playerIndex, 1);
            }


            emitRooms();
        }
        //send left player info before deleting
        //console.log('player index', playerIndex);

    });

    /*console.log(socket);*/
    /*players.push(new Player(socket.id, 'test'));*/


    socket.on('userLoggedIn', function (payload) {

    });

    socket.on('shuffle', function (payload) {
        //cards = helpers.shuffle();
    });

    socket.on('play', function (payload) {
        if (cards.length === 0) {
            cards = helpers.shuffle();
        }

        console.log("EMITTING PLAY");
        console.log(payload);
        var room = getRoom(payload['room']['id']);
        //console.log(room);
        room.startGame(new Game([
            room.players[0].getId(),
            room.players[1].getId(),
            room.players[2].getId(),
            room.players[3].getId(),
        ]));

        var game = room.game();
        game.setCards(helpers.shuffle()).startRound();
        // console.log(Object.keys(socket.adapter.rooms));
        // console.log(Object.keys(socket.adapter.sids));
        // console.log(Object.keys(socket.rooms));
        socket.emit('play', {
            game: game
        });
    })

    /*// Socket event for gist created
     socket.on('gistSaved', function(gistSaved){
     io.emit('gistSaved', gistSaved);
     });

     // Socket event for gist updated
     socket.on('gistUpdated', function(gistUpdated){
     io.emit('gistUpdated', gistUpdated);
     });*/

    function emitRooms() {
        io.emit('roomsUpdated', {
            rooms: rooms
        });
    }

    function getRoom(id) {
        var index = helpers.getIndexByKey('id', id, rooms);
        if (index !== false) {
            return rooms[index];

        } else {
            return false;
        }
    }

    function getGame(id) {
        var index = helpers.getIndexByKey('id', id, rooms);
        if (index !== false) {
            return rooms[index].game();

        } else {
            return false;
        }
    }


    function emitError(socket, msg) {
        socket.emit('server_error', {
            message: msg
        });
    }
});