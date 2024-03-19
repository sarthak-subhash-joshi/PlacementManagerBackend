const express=require('express')

const {createStudentRecord,getStudentRecord,getStudentRecords,deleteStudentRecord,updateStudentRecord} = require('../controller/studentRecordController')


const router=express.Router()

router.get('/',getStudentRecords)

router.get('/:id',getStudentRecord)

router.post('/',createStudentRecord)

router.delete('/:id',deleteStudentRecord)

router.patch('/:id',updateStudentRecord)


module.exports=router


