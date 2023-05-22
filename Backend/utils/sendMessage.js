const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

async function sendMessage(phoneNo, otp)  {
    await client.messages.create({
        body: 'Your OTP for LandChain is ' + otp,
        from: process.env.TWILIO_PHONE_NO,
        to: phoneNo
    })
}

module.exports = sendMessage;