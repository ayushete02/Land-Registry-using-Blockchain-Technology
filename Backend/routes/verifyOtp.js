const express = require("express");
const router = express.Router();
const UserDetails = require("../models/userDetails");
const sendMessage = require("../utils/sendMessage");

router.post("/sendOtp", async (req, res) => {
    if(!req.body.aadharNo){
        res.status(400).send({
            "message": "Please enter the required fields"
        })
        return;
    }
    try{
        const aadharNo = req.body.aadharNo;
        var user_details = await UserDetails.findOne({aadharNo: aadharNo})

        if(!user_details){
            res.status(400).send({
                "message": "User not found"
            })
            return;
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        await sendMessage("+91"+user_details.phoneNo, otp)

        user_details.otp = otp;
        user_details.otpValidTill = Date.now() + 15 * 60* 1000; // 15 minutes
        await user_details.save()
        res.status(200).send({
            "message": "OTP sent successfully"
        })
    } catch (error) {
        res.status(400).send({
            "message": "Error "+ error.message
        })
    }
})

router.post("/verifyOtp", async (req, res) => {
    if(!req.body.aadharNo || !req.body.otp){
        res.status(400).send({
            "message": "Please enter the required fields"
        })
        return;
    }
    try{
        const aadharNo = req.body.aadharNo;
        const otp = req.body.otp;

        var user_details = await UserDetails.findOne({aadharNo: aadharNo})

        if(!user_details){
            res.status(400).send({
                "message": "User not found"
            })
            return;
        }

        if(!user_details.otp || !user_details.otpValidTill){
            res.status(400).send({
                "message": "OTP not sent"
            })
            return;
        }

        if(user_details.otp != otp){
            res.status(400).send({
                "message": "OTP does not match"
            })
            return;
        }

        if(user_details.otpValidTill < Date.now()){
            res.status(400).send({
                "message": "OTP expired"
            })
            return;
        }
        
        user_details.otp = null;
        user_details.otpValidTill = null;
        await user_details.save()

        res.status(200).send({
            "message": "OTP verified successfully"
        })

    } catch (error) {
        res.status(400).send({
            "message": "Error "+ error.message
        })
    }
})

module.exports = router;