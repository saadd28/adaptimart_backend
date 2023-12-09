// const UserService = require()

const userService = require("../Services/user.service")

module.exports = {
    postUser : (req, res) => {
        userService.postUser(req.body, (error, result) =>{
            if (result) return res.status(200).send(result);
            else return res.status(500).send(error);
        });
    },

    authenticateUser : (req, res) => {
        userService.authenticateUser(req.body, (error, result) =>{
            if (result) return res.status(200).send(result);
            else return res.status(500).send(error);
        });
    }
}   