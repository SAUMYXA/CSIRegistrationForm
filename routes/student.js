const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getStudents,
  registerStudent,
  findStudent,
  sendMail,
  verifyMail,
} = require("../controllers/student");
const router = express.Router();
router.post("/register", registerStudent);
router.get("/", getStudents);
router.get("/find/:studentNo", findStudent);
router.get("/sendEmail", sendMail);
router.get("/verify/:id", verifyMail);
const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploads");
  },
  filename: (req, file, cb) => {
    console.log(file), cb(null, Date.now() + path.extname(file.originalname));
  },
});

router.post("/upload", upload.single("images"), (req, res) => {
  res.send("image uploaded");
});
module.exports = router;
