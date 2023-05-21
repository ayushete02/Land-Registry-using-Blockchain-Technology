const express = require("express");
const router = express.Router();
const SellingLand = require("../models/SellingLand");

router.get("/", async (req, res) => {
  res.set({
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT,OPTIONS",
  });
  try {
    const details = await SellingLand.find();
    res.status(200).json(details);
  } catch (error) {
    res.status(400).send({
      message: "Error " + error.message,
    });
  }
});

router.post("/", async (req, res) => {
  res.set({
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT,OPTIONS",
  });

  if (!req.body.owner || !req.body.propertyID) {
    res.status(400).send({
      message: "Please enter the required fields",
    });
    return;
  }
  try {
    var land_details = {
      owner: req.body.owner,
      request: req.body.request,
      propertyID: req.body.propertyID,
      physicalSurveyNo: req.body.physicalSurveyNo,
      tokenID: req.body.tokenID,
      Area: req.body.Area,
      City: req.body.City,
      ownerAddress: req.body.ownerAddress,
      Buyer_name: req.body.Buyer_name,
      InspectorName: req.body.InspectorName,
      Buyer_address: req.body.Buyer_address,
      Document_Access: req.body.Document_Access,
    //   tokensend: req.body.tokensend,
      ProcessStatus: req.body.ProcessStatus,
    //   Document_Verify: req.body.Document_Verify,
    //   Transaction: req.body.Transaction,
    //   Ownership_Transfer: req.body.Ownership_Transfer,
      Price: req.body.Price,
      ImageURL: req.body.ImageURL,
      DocumentURL: req.body.DocumentURL,
      PaymentStatus: req.body.PaymentStatus,
      TransactionHash: req.body.TransactionHash,
      OwnerAdhar: req.body.OwnerAdhar,
      OwnerContact: req.body.OwnerContact,
      BuyerTokenstatus: req.body.BuyerTokenstatus,
      StampDutyTokenStatus: req.body.StampDutyTokenStatus,
      PaymentDuration: req.body.PaymentDuration,
    };
    const details = new SellingLand(land_details);
    await details.save();
    res.status(200).send({
      message: "Land Details saved successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: "Error " + error.message,
    });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sellingLand = await SellingLand.findOne({propertyID:id});
    if (!sellingLand) {
      return res.status(404).send({ message: "Land details not found" });
    }
    console.log(
        sellingLand, req.body.owner
    )

    if (req.body.owner) {
      sellingLand.owner = req.body.owner;
    }
    if (req.body.request) {
      sellingLand.request = req.body.request;
    }
    if (req.body.physicalSurveyNo) {
      sellingLand.physicalSurveyNo = req.body.physicalSurveyNo;
    }

    if (req.body.tokenID) {
      sellingLand.tokenID = req.body.tokenID;
    }
    if (req.body.Area) {
      sellingLand.Area = req.body.Area;
    }
    if (req.body.propertyID){
        sellingLand.propertyID = req.body.propertyID;
    }
    if (req.body.City) {
      sellingLand.City = req.body.City;
    }
    if (req.body.ownerAddress) {
      sellingLand.ownerAddress = req.body.ownerAddress;
    }
    if (req.body.Buyer_name) {
      sellingLand.Buyer_name = req.body.Buyer_name;
    }
    if (req.body.InspectorName) {
      sellingLand.InspectorName = req.body.InspectorName;
    }
    if (req.body.Buyer_address) {
      sellingLand.Buyer_address = req.body.Buyer_address;
    }
    if (req.body.Document_Access) {
      sellingLand.Document_Access = req.body.Document_Access;
    }
    if (req.body.ProcessStatus) {
        sellingLand.ProcessStatus = req.body.ProcessStatus;
        }
    // if (req.body.tokensend) {
    //   sellingLand.tokensend = req.body.tokensend;
    // }
    // if (req.body.Document_Verify) {
    //   sellingLand.Document_Verify = req.body.Document_Verify;
    // }
    // if (req.body.Transaction) {
    //   sellingLand.Transaction = req.body.Transaction;
    // }
    // if (req.body.Ownership_Transfer) {
    //   sellingLand.Ownership_Transfer = req.body.Ownership_Transfer;
    // }
    if (req.body.Price) {
      sellingLand.Price = req.body.Price;
    }
    if (req.body.ImageURL) {
      sellingLand.ImageURL = req.body.ImageURL;
    }
    if (req.body.DocumentURL) {
      sellingLand.DocumentURL = req.body.DocumentURL;
    }
    if (req.body.PaymentStatus) {
      sellingLand.PaymentStatus = req.body.PaymentStatus;
    }
    if (req.body.TransactionHash) {
      sellingLand.TransactionHash = req.body.TransactionHash;
    }
    if (req.body.OwnerAdhar) {
        sellingLand.OwnerAdhar = req.body.OwnerAdhar;
      }
      if (req.body.OwnerContact) {
        sellingLand.OwnerContact = req.body.OwnerContact;
      }
      if (req.body.BuyerTokenstatus) {
        sellingLand.BuyerTokenstatus = req.body.BuyerTokenstatus;
      }
      if (req.body.StampDutyTokenStatus) {
        sellingLand.StampDutyTokenStatus = req.body.StampDutyTokenStatus;
      }
      if (req.body.PaymentDuration) {
        sellingLand.PaymentDuration = req.body.PaymentDuration;
      }


    await sellingLand.save();
    res.status(200).send({ message: "Land details updated successfully" });
  } catch (error) {
    res.status(400).send({ message: "Error " + error.message });
  }
});

module.exports = router;
