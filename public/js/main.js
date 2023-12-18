
const form = document.querySelector("#chat-form")
let chatArea = document.querySelector(".chat-messages")
let chatName = document.querySelector("#room-name")
let showUsers = document.querySelector("#users")


const socket = io()

const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix:true})


socket.emit("newUser", {username, room})

socket.on("message", (message) => {
  //console.log(message)
  outputMessage(message)
  chatArea.scrollTop = chatArea.scrollHeight
})

socket.on("allUsers", ({room, users}) => {
  showRoom(room)
  showUsersRoom(users)
})




form.addEventListener("submit", (e) => {
  e.preventDefault()
  let input = document.querySelector("#msg")
  let inputValue = input.value
  socket.emit("newMessage", inputValue)
  //console.log(inputValue)
  input.value = ""
  input.focus()


})

let outputMessage = (message) => {
  //console.log(message)
  let div = document.createElement("div")
  div.classList.add("message")
  div.innerHTML = `<p class="meta">${message.username} <span> ${message.time}</span></p>
  <p class="text">
  ${message.text}
  </p>`
  chatArea.append(div)
}

function showRoom(room) {
  chatName.innerHTML = ""
  chatName.innerHTML = room
}

function showUsersRoom(users) {
  showUsers.innerHTML = ""
  users.forEach((user) => {
    //console.log(user)
    let li = document.createElement("li")
    li.innerHTML = user.name
    showUsers.append(li)
  })
}
