const router = require('express').Router();
let medicine_add_schema = require('../models/medicine.add');
let medicine_req_schema = require('../models/medicineStockReq');
router.route('/addMedicine').post((req,res) => {
   
    const name = req.body.name;
    const price = req.body.price;
    const brand = req.body.brand;
    const description = req.body.description;
    const date = req.body.date;
    
    const quantity = req.body.quantity;
    const image = req.body.image;
   
    const status = "Request";
   

    const medicine_import_data = new medicine_add_schema({name, price, brand, description,status, quantity,image,date});

    medicine_import_data.save()
        .then(() => res.json('Medicine import Add!'))
        .catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
                });
});



router.route('/addMedicineRequest').post((req,res) => {
   
    const name = req.body.name;

    const brand = req.body.brand;
    const description = req.body.description;
    const date = req.body.date;
    
    const quantity = req.body.quantity;

   
    const status = "Request";
   

    const medicine_import_data = new medicine_req_schema({name, brand, description,status, quantity,date});

    medicine_import_data.save()
        .then(() => res.json('Medicine Request Add!'))
        .catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
                });
});



router.route("/allMedicineRequest").get(async (req, res) => {
   
            medicine_req_schema.find()
            .then(Vehicles => res.json(Vehicles))
            .catch(err => res.status(400).json('No Data'))
});


router.route("/medicineReqUpdate/:id").put(async (req,res) => {
    let id = req.params.id;
    const {name, brand, description,quantity ,date}= req.body;

    const reqUpdate={
        name, brand, description,quantity ,date
    }
    const update = await medicine_req_schema.findByIdAndUpdate(id,reqUpdate).then(() => {
        res.status(200).send({status :"Medicine request Updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Updating Data",error: err.message});
    });


});


router.route("/deleteReq/:id").delete(async (req, res) => {
    let id = req.params.id;
    medicine_req_schema.findByIdAndDelete(id).then(() => {
            res.status(200).send({status :"Medicine stoke request Deleted"});
    }).catch((err) => {
        console.log(err);
            res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});

router.route("/allMedicines").get(async (req, res) => {
        medicine_add_schema.find()
                .then(Medicines => res.json(Medicines))
                .catch(err => res.status(400).json('No Data'))
});




router.route("/MedicineUpdate/:id").put(async (req,res) => {
    let id = req.params.id;
    const {name, price, brand, date, description, quantity}= req.body;

    const medicineUpdate={
        name, price, brand, date, description, quantity
    }
    const update = await medicine_add_schema.findByIdAndUpdate(id,medicineUpdate).then(() => {
        res.status(200).send({status :"Medicine Updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Updating Data",error: err.message});
    });
});


router.route("/deleteMedicine/:id").delete(async (req, res) => {
    let id = req.params.id;
    medicine_add_schema.findByIdAndDelete(id).then(() => {
            res.status(200).send({status :"vehicle Delted"});
    }).catch((err) => {
        console.log(err);
            res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/allVehicleRequest").get(async (req, res) => {
        medicine_add_schema.find({status : 'Request'})
                .then(Vehicles => res.json(Vehicles))
                .catch(err => res.status(400).json('No Data'))
});


router.route("/deleteVehicle/:id").delete(async (req, res) => {
        let id = req.params.id;
        medicine_add_schema.findByIdAndDelete(id).then(() => {
                res.status(200).send({status :"vehicle Delted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

router.route("/vehicleUpdate/:id").put(async (req,res) => {
        let id = req.params.id;
        const {auctionDate, vehicleType, brand, model, color, condition}= req.body;

        const vehicleUpdate={
           auctionDate, vehicleType, brand, model, color, condition
        }
        const update = await medicine_add_schema.findByIdAndUpdate(id,vehicleUpdate).then(() => {
            res.status(200).send({status :"Vehicle Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/medicineAvailability/:id").put(async (req,res) => {
        let id = req.params.id;
        const status = req.body.status;

        const medicineUnavaluable={
           status
        }
        const update = await medicine_req_schema.findByIdAndUpdate(id,medicineUnavaluable).then(() => {
            res.status(200).send({status :"Medicine state Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});


router.route("/search/:key").get(async (req, res) => {
    let result = await medicine_add_schema.find({
        "$or":[
            {name:{$regex:req.params.key}}
        ]
    })    
    res.send(result)
});

module.exports = router;