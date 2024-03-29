// const UserService = require()

const accountService = require("../Services/account.service");

module.exports = {
  postAccount: (req, res) => {
    accountService.postAccount(req.body, req.file, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  postAdminAccount: (req, res) => {
    accountService.postAdminAccount(req.body, req.file, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  getAllAccounts: (req, res) => {
    accountService.getAllAccounts((error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  deleteAccount: (req, res) => {
    const id = req.body.id;
    console.log("req.body", req.body);
    accountService.deleteAccount(id, (error, result) => {
      if (result.affectedRows === 1) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getAccountsByName: (req, res) => {
    console.log("req.query", req.query);
    accountService.getAccountsByName(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  updateAccount: (req, res) => {
    accountService.updateAccount(req.body, req.file, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  getAccountsById: (req, res) => {
    console.log("req.query", req.query);
    accountService.getAccountsById(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  login: (req, res) => {
    console.log("req.query", req.query);
    accountService.login(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  blockUser: (req, res) => {
    console.log("req.query", req.query);
    accountService.blockUser(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },

  unblockUser: (req, res) => {
    console.log("req.query", req.query);
    accountService.unblockUser(req.query, (error, result) => {
      if (result) return res.status(200).send(result);
      else return res.status(500).send(error);
    });
  },
  
};
