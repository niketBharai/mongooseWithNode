const express = require("express");
const router = express.Router();

const EmployeeController = require("../controllers/employee");
const auth = require("../middleware/auth");

router.get("/", auth, EmployeeController.index);
router.post("/show", EmployeeController.show);
router.post("/store", EmployeeController.store);
router.post("/update", EmployeeController.update);
router.post("/remove", EmployeeController.remove);

module.exports = router;
