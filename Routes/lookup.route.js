// const { postUser, authenticateUser } = require("../Controller/user.controller");

const { getById, getByParentId, getNullParentId } = require("../Controller/lookup.controller");

const router = require("express").Router();

// router.post("/add", upload, postAccount);
// router.get("/getall", getAllAccounts);
// router.put("/delete", deleteAccount);
// router.get("/getbyname", getAccountsByName);
// router.post("/update", upload, updateAccount);
router.get("/getbyid", getById);
router.get("/getbyparentid", getByParentId);
router.get("/getnullparentid", getNullParentId);


module.exports = router;
