// const { postUser, authenticateUser } = require("../Controller/user.controller");

const { postAccount, getAllAccounts, deleteAccount, getAccountsByName, updateAccount, getAccountsById ,blockUser,unblockUser, postAdminAccount , login, changepassword} = require("../Controller/account.controller");

const router = require("express").Router();

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
}).single("profile_pic");

router.post("/add", upload, postAccount);
router.post("/adduseradmin", upload, postAdminAccount);
router.get("/getall", getAllAccounts);
router.put("/delete", deleteAccount);
router.get("/getbyname", getAccountsByName);
router.post("/update", upload, updateAccount);
router.get("/getbyid", getAccountsById);
router.get("/login", login);
router.post("/blockUser", blockUser);
router.post("/unblockUser", unblockUser);
router.post("/changepassword", changepassword);



module.exports = router;
