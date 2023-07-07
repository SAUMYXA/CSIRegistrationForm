const express=require('express');
const { getStudents, registerStudent, findStudent,sendMail } = require('../controllers/student');
const router=express.Router();
router.post('/register',registerStudent)
router.get('/',getStudents)
router.get('/find/:studentNo',findStudent)
router.get('/sendEmail',sendMail)
module.exports=router;