var StudentRecordModel = require('../models/studentRecordModel')
var csv = require('csvtojson')

const importUser= async(req,res)=>{

    var userData=[]

    try{
        csv().fromFile(req.file.path)
        .then(async(response)=>{

            for(var i=0;i<response.length;i++){
                userData.push({
                    firstName:response[i].firstName,
                    middleName: response[i].middleName,
                    lastName: response[i].lastName,
                    email: response[i].email,
                    mobileNo: response[i].mobileNo,
                    batch: response[i].batch,
                    universityPRN: response[i].universityPRN,
                    gender: response[i].gender,
                    collegeName: response[i].collegeName,
                    course: response[i].course,
                    branch: response[i].branch,
                    classXScore: response[i].classXScore,
                    classXIIScore: response[i].classXIIScore,
                    UGAggregate: response[i].UGAggregate,
                    PGAggregate: response[i].PGAggregate

                })
            }
            
            await StudentRecordModel.insertMany(userData)

        })

        res.send({status:200,success:true,msg:'CSV Imported'})
    }catch(error){
        res.send({status:400,success:false,msg:error.message})
    }
}

module.exports={
    importUser
}