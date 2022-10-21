const router = require('express').Router();
let customerProfile = require('../models/customerProfile');

router.route("/allUserRegs").get(async (req, res) => {
    customerProfile.find()
            .then(User => res.json(User))
            .catch(err => res.status(400).json('No Data'))
});

router.route("/allUserRegs/:id").get(async (req, res) => {
    let name = req.params.id;
    customerProfile.find({name : name})
            .then(User => res.json(User))
            .catch(err => res.status(400).json('No Data'))
});

router.route("/deleteUSer/:id").delete(async (req, res) => {
    let id = req.params.id;
    customerProfile.findByIdAndDelete(id).then(() => {
            res.status(200).send({status :"User Delted"});
    }).catch((err) => {
        console.log(err);
            res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;