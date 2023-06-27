const express=require('express');
const { getStudents, registerStudent, findStudent } = require('../controllers/student');
const router=express.Router();
router.post('/register',registerStudent)
router.get('/',getStudents)
router.get('/find/:studentNo',findStudent)
module.exports=router;