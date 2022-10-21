const router = require('express').Router();
let doctor_ad_schema = require('../models/DoctorsAdd');

router.route('/addNewDoctor').post((req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const telephone1 = req.body.telephone1;
    const Category = req.body.Category;
    const Salary = req.body.Salary;
    const address = req.body.address;

    const Doctor_data = new doctor_ad_schema({name , email , telephone1 , Category , Salary,address });

    Doctor_data.save()
        .then(() => res.json('New Doctor Add!'))
        .catch(err => res.status(400).json('Error: '+err));
});




router.route("/allDoctors").get(async (req, res) => {
    doctor_ad_schema.find()
            .then(ChannelBooking => res.json(ChannelBooking))
            .catch(err => res.status(400).json('No Data'))
});


router.route("/docUpdate/:id").put(async (req,res) => {
    let id = req.params.id;
    const {name, email, telephone1,Category ,Salary,address}= req.body;

    const reqUpdate={
        name, email, telephone1,Category ,Salary,address
    }
    const update = await doctor_ad_schema.findByIdAndUpdate(id,reqUpdate).then(() => {
        res.status(200).send({status :"Doctor Updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Updating Data",error: err.message});
    });


});

router.route("/deleteDoc/:id").delete(async (req, res) => {
    let id = req.params.id;
    doctor_ad_schema.findByIdAndDelete(id).then(() => {
            res.status(200).send({status :"Doctor Deleted"});
    }).catch((err) => {
        console.log(err);
            res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/search/:key").get(async (req, res) => {
    let result = await doctor_ad_schema.find({
        "$or":[
            {name:{$regex:req.params.key}}
        ]
    })    
    res.send(result)
});

module.exports = router;