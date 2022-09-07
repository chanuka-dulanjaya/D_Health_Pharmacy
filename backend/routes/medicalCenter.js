const router = require('express').Router();
let medical_Center_schema = require('../models/medicalCenter');

router.route('/addMedical_center').post((req,res) => {
    const location = req.body.location;
    const address = req.body.address;
    const telephone1 = req.body.telephone1;
    const email = req.body.email;
    const telephone2 = req.body.telephone2;
    const image = req.body.picture;

    const Medical_center = new medical_Center_schema({location , address , telephone1 , email , telephone2 , image});

    Medical_center.save()
        .then(() => res.json('Medical center Add!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route("/allMedical_center").get(async (req, res) => {
        medical_Center_schema.find()
                .then(Service_center => res.json(Service_center))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/deleteMedical_center/:location").delete(async (req, res) => {
        let location = req.params.location;
        medical_Center_schema.findOneAndDelete({location : location}).then(() => {
                res.status(200).send({status :"Medical Center Deleted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

router.route("/Medical_centerUpdate/:id").put(async (req,res) => {
        let id = req.params.id;
        const {address , telephone1 ,email, telephone2}= req.body;

        const Service_centerUpdate={
           address,telephone1,email, telephone2
        }
        const update = await medical_Center_schema.findByIdAndUpdate(id,Service_centerUpdate).then(() => {
            res.status(200).send({status :"Medical Center Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});


router.route("/search/:key").get(async (req, res) => {
        let result = await medical_Center_schema.find({
            "$or":[
                {location:{$regex:req.params.key}}
            ]
        })    
        res.send(result)
    });

module.exports = router;