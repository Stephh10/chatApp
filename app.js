let express = require("express")
let http = require("http")
const path = require('path')
let app = express()
let socketio = require("socket.io")
let createMessage = require("./utils/createMessage")
let {createUser, findUser, removeUser, findAllUsers} = require("./utils/createUser")

app.use(express.static(path.join(__dirname, 'public')))
let server = http.createServer(app)
let io = socketio(server)

let chatCore = "Chat"

io.on("connection", (socket) => {
    socket.on("newUser", ({username, room}) => {
        let user = createUser(socket.id, username, room)
        //console.log(user.room)
        socket.join(user.room)
       
        socket.emit("message", createMessage(chatCore,"Welcome to ChatApp"))

        socket.on("newMessage", (message) => {
            io.to(user.room).emit("message", createMessage(user.name, message ) )
        })

        let currentUser = findUser(socket.id)
        //console.log(currentUser)
        socket.broadcast.emit("message", createMessage(chatCore,`${currentUser.name} has join the chat` ))
        
        io.to(user.room).emit("allUsers", {
            room:user.room,
            users:findAllUsers(user.room)
        })
       
    })

 
    // socket.on("newMessage", (message) => {
    //     io.emit("message", message)
    // }) 

    

    socket.on("disconnect", () => {
        let user = removeUser(socket.id)
        io.to(user.room).emit("message", createMessage(chatCore,`${user.name} has left the chat` ))
        io.to(user.room).emit("allUsers", {
            room:user.room,
            users:findAllUsers(user.room)
        })
    })
    
})


server.listen(3000, () => {
    console.log("Server started")
})