//config a server
const express = require("express")
const router = express.Router()
const req = require("express/lib/request")
const res =require("express/lib/response")
const person = require("../Model/person")
//create + save a person
router.post('/',async(req,res) =>{
        try{
            const newPerson = person(req.body)
            await newPerson.save()
            res.send({newPerson,msg:"ajout avec succes" })
        }
        catch{
            res.send(error.msg )
        }  
}
)
//Use model.find() to Search Your Database:
router.get("/findid/:_id",async(req,res) => {
    try{
        const findid  = await person.findById({_id:req.params.id}).exec()
        res.status(200).send(findId)
    }
    catch(error){
        res.status(404).send({msg:"person is not found"})
    }
})
//find and remove
router.delete("/deleteperson/:_id",async(req,res) =>{
    try{
        const deleteperson = await person.findByIdAndRemove({_id:req.params.id}).exec()
        res.status(200).send(deleteperson)
    }
    catch(error){
        res.status(404).send({msg:"person is not found"})
    }
})

//Use model.findOne() to Return a Single Matching Document from Your Database

router.findOne("/findonebyfood/:_id",async(req,res)=>{
    try {
        const findonebyfood = await person.findOne({_id:req.params.id }).exec();
        res.status(200).send(founded)
      } catch (error) {
        res.status(404).send({msg:"not founded"})
      }
    })

    // Perform Classic Updates by Running Find, Edit, then Save

    router.update("/updateperson/:_id",async(req,res)=>{
    try {
        const updateperson = await Person.findById(personId).exec();
        if (updateperson) {
          person.favoriteFoods.push('hamburger');
          const updatedPerson = await person.save();
          res.status(200).send(founded)
          // Do something with the updated person
        } else {
            res.status(404).send(notfounded)
          // Handle the case when no person is found
        }
      } catch (error) {
        
        res.status(404).send({msg :"Error occurred while updating the person"})
       
        // Handle the error
      }
    })
    //
    router.chain("/searchchain/:_id",async(req,res)=>{
    try{
        Person.find({ favoriteFoods: 'burritos' })
  .sort('name')
  .limit(2)
  .select('-age')
  .exec((err, data) => {
    res.status(200).send(founded)  }
  )}
  catch(error){
    res.status(404).send({msg :"Error occurred while querying the database"})
  }
})
  