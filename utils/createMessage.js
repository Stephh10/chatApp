let moment = require("moment")
function createMessage (username, text) {
    return {
        username,
        text,
        time: moment().format("h:mm s")
    }
}

module.exports = createMessage