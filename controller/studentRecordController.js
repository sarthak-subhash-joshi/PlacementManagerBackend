// Importing StudentRecord model
const StudentRecordModel=require('../models/studentRecordModel')
const PlacementRecordModel = require('../models/placementRecordModel');
const mongoose=require('mongoose')


// get all StudentRecordModels

// const getStudentRecords = async(req,res)=>{
//    const studentRecords=await StudentRecordModel.find({}).sort({createdAt:-1})
//    res.status(200).json(studentRecords)
// }

// get all StudentRecordModels with search
const getStudentRecords = async (req, res) => {
    try {
        let query = {};

        // Check if there is a search term in the request query
        if (req.query.q) {
            const searchTerm = req.query.q;

            // Define the search criteria
            query = {
                $or: [
                    { firstName: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for firstName
                    { middleName: { $regex: searchTerm, $options: 'i' } }, 
                    { lastName: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for lastName
                    { email: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for email
                    { universityPRN: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for universityPRN
                    { mobileNo: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for mobileNo
                    // Add more fields for search as needed
                ]
            };
        }

        const studentRecords = await StudentRecordModel.find(query).sort({ createdAt: -1 });
        res.status(200).json(studentRecords);
    } catch (error) {
        console.error("Error fetching student records:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


// get a single StudentRecordModel

const getStudentRecord = async (req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such record exists"})
    }

    const studentRecord = await StudentRecordModel.findById(id)

    if(!studentRecord){
        return res.status(404).json({error:"No such record exists "})
    }

    res.status(200).json(studentRecord)
}

// create a new StudentRecordModel
const createStudentRecord= async(req,res)=>{
    const {firstName,middleName,lastName,email,mobileNo,batch,universityPRN,gender,collegeName,course,branch,classXScore,classXIIScore,UGAggregate,PGAggregate} = req.body


    try{
        const studentRecord = await StudentRecordModel.create({firstName,middleName,lastName,email,mobileNo,batch,universityPRN,gender,collegeName,course,branch,classXScore,classXIIScore,UGAggregate,PGAggregate})
        res.status(200).json(studentRecord)

    }catch(error){
         res.status(400).json({error:error.message})

    }

}

// delete a StudentRecordModel
const deleteStudentRecord= async(req,res)=>{
    const {id}=req.params

     // Delete associated placement records first
     await PlacementRecordModel.deleteMany({ studentId: id })

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such record exists"})
    }

    const studentRecord= await StudentRecordModel.findOneAndDelete({_id:id})

    if(!studentRecord){
        return res.status(404).json({error:"No such record exists"})
    }

    res.status(200).json(studentRecord)

}


// update a StudentRecordModel
const updateStudentRecord=async (req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such record exists"})
    }

    const studentRecord= await StudentRecordModel.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!studentRecord){
        return res.status(404).json({error:"No such record exists"})
    }

    res.status(200).json(studentRecord)

}

  



module.exports={
    createStudentRecord,
    getStudentRecords,
    getStudentRecord,
    deleteStudentRecord,
    updateStudentRecord,
}