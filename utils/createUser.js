let users = []

function createUser(id, name, room) {
    let user = {
        id,
        name,
        room
    }
    users.push(user)
    return user
}

function findUser(id) {
    return users.find(user => user.id == id )
}

function removeUser(id) {
    let index = users.findIndex(user => user.id == id)
    if(index !== -1) {
       return users.splice(index, 1)[0]
    }
}

function findAllUsers(room) {
    return users.filter(user => user.room == room)
}

module.exports = {
    createUser,
    findUser,
    removeUser,
    findAllUsers
}