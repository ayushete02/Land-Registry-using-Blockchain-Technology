const express = require('express')
const router = express.Router() 
const LandDetails = require('../models/landDetails')

router.get('/', async(req, res) => {
    try {
        const details = await LandDetails.find()
        res.status(200).json(details)
    } catch (error) {
        res.status(400).send({
            "message": "Error "+ error.message
        })
    }
})

router.post('/', async(req, res) => {
    if(!req.body.owner || !req.body.propertyID){
        res.status(400).send({
            "message": "Please enter the required fields"
        })
        return;
    }
    try {
        var land_details = {
            owner: req.body.owner,
            areaOfLand: req.body.areaOfLand,
            pricePerSqFeet: req.body.pricePerSqFeet,
            propertyID: req.body.propertyID,
            physicalSurveyNo: req.body.physicalSurveyNo,
            status: req.body.status,
            OwnerAdhar: req.body.OwnerAdhar,
            TokenID: req.body.TokenID,
            OwnerContact: req.body.OwnerContact,
        }
        if(req.body.location != null){
            land_details.location = {}
            land_details.location.area = req.body.location.area
            land_details.location.city = req.body.location.city
            land_details.location.state = req.body.location.state
        
        }
        const details = new LandDetails(land_details)
        await details.save()
        res.status(200).send({
            "message": "Land Details saved successfully"
        })
    } catch (error) {
        res.status(400).send({
            "message": "Error "+ error.message
        })
    }
})

router.post('/:id', async(req, res) => {
    try {
      const id = req.params.id;
      const landDetails = await LandDetails.findOne({propertyID:id})
      if (!landDetails) {
        return res.status(404).send({ message: 'Land details not found' });
      }
      if (req.body.owner) {
        landDetails.owner = req.body.owner;
      }
      if (req.body.areaOfLand) {
        landDetails.areaOfLand = req.body.areaOfLand;
      }
      if (req.body.pricePerSqFeet) {
        landDetails.pricePerSqFeet = req.body.pricePerSqFeet;
      }
      if (req.body.physicalSurveyNo) {
        landDetails.physicalSurveyNo = req.body.physicalSurveyNo;
      }
      if (req.body.status) {
        landDetails.status = req.body.status;
      }
      if (req.body.OwnerAdhar) {
        landDetails.OwnerAdhar = req.body.OwnerAdhar;
      }
      if (req.body.OwnerContact) {
        landDetails.OwnerContact = req.body.OwnerContact;
      }
      if (req.body.TokenID) {
        landDetails.TokenID = req.body.TokenID;
      }
      if (req.body.location) {
        if (req.body.location.area) {
          landDetails.location.area = req.body.location.area;
        }
        if (req.body.location.city) {
          landDetails.location.city = req.body.location.city;
        }
        if (req.body.location.state) {
          landDetails.location.state = req.body.location.state;
        }
      }
      await landDetails.save();
      res.status(200).send({ message: 'Land details updated successfully' });
    } catch (error) {
      res.status(400).send({ message: 'Error ' + error.message });
    }
  });
  

module.exports = router