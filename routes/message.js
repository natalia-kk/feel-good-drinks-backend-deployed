// ROUTES file: message.js

const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Message = require('./../models/Message')
const path = require('path') 

// GET - get all messages
router.get('/', (req, res) => {
  // get all products from the Message model (so all messages in the MongoDB messages collection) using the find() method
  Message.find()
      // if successful will return json object containing list of all messages (messages)
      .then((messages) => {
          res.json(messages)
      })
      // runs when there's an error
      // print error message + info in error object in console log
      .catch((err) => {
          console.log("Problem getting messages", err)
      })
})

// POST - create a new message -----------------------------------------------------
router.post('/', (req, res) => {
  // validate request 
  if(!req.body) return res.status(400).send({message: "Message content can't be empty"})
    // stops the code from continuing to run, user must fill out form correctly and submit again.

  let attachmentFilename = null

  // if an attachment exists, upload it first
  if(req.files && req.files.attachment){
    // upload attachment then create message
    let uploadPath = path.join(__dirname, '..', 'public', 'files') // (note from Natalia) - this is the part that does not work
    Utils.uploadFile(req.files.attachment, uploadPath, (uniqueFilename) => {
      attachmentFilename = uniqueFilename
      // create a new message with all fields including attachment
      let newMessage = new Message({  
        fullName: req.body.fullName,
        businessName: req.body.businessName, // not a required field
        email: req.body.email,
        phone: req.body.phone, // not a required field
        message: req.body.message,
        attachment: attachmentFilename
      })
      // save new message to DB
      newMessage.save()
      .then(message => {        
        // success!  
        // return 201 status with message object
        return res.status(201).json(message)
      })
      .catch(err => {
        console.log(err)
        return res.status(500).send({
          message: "Problem sending your message",
          error: err
        })
      })
    })
  }else{
    // save new message to DB without attachmnt
    let newMessage = new Message (req.body)
    newMessage.save()
    .then(message => {        
      // success!  
      // return 201 status with message object
      return res.status(201).json(message)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({
        message: "Problem sending your message",
        error: err
      })
    })
  }
})
   
// EXPORT the router object 
// (imported in server.js in 'ROUTES' section)
module.exports = router