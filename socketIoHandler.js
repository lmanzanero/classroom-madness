import { Server } from "socket.io";

export default async function injectSocketIO(server) { 
  const io = new Server(server);
    /**
       * @type {{ id: string; username: any; room: any; }[]}
       */
    const users = [];
 
  io.on('connection', (socket) => {
   
      let username = `User ${Math.round(Math.random() * 999999)}`;
      socket.on('joinRoom', ({username, room }) => {
        const user = {
            id: socket.id,
            username: username,
            room: room,
            score: 0,
            level: 0,
            health:0 
        }
        if(username) {
            users.push(user);
        }
        socket.join(room)
        console.log(users);

        //Welcome message when room is created
        socket.to(room).emit('roomMessage', `Room was created with ${socket.id}`)

        //Broadcasdt when a user connects to room
        socket.broadcast.to(room).emit('roomMessage', `${username} has joined the game`);
        // Get room users
        function getRoomUsers(room) {
            return users.filter(user => user.room === room);
        }

        //Send users and room info
        socket.to(room).emit("roomUsers", {
            room: room,
            users: getRoomUsers(room)
        })
      })

      socket.on('startGame', ({room}) => {
        //Start game for everyone in unique room
        socket.broadcast.to(room).emit('gameStatus', true)
      });

      socket.on('endGame', ({room}) => {
        //Start game for everyone in unique room
        socket.broadcast.to(room).emit('gameStatus', false)
      });

      socket.on('scoreChange', ({room, user, score}) => {
        console.log(room, user, score)
        //update score for user
         users.forEach((roomUser, index) => {
            if(roomUser.username === user) {
                users[index].score = score;
            }  
        });

        console.log(users)

        //show new score to users
        socket.broadcast.to(room).emit('scoreUpdates', users);
      })

      socket.emit('name', username);

      socket.on('message', (message) => {
          io.emit('message', {
              from: username,
              message: message,
              time: new Date().toLocaleString()
          });
      });
  });

  console.log('SocketIO injected');
}
