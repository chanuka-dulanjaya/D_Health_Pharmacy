const router = require('express').Router();
let brand_main_Schema = require('../models/brand');

router.route('/addBrand').post((req,res) => {
    const Brand = req.body.Brand;
    const url = req.body.url;
    const telephone = req.body.telephone;
    const email = req.body.email;
   const image = req.body.picture;

    const brand = new brand_main_Schema({Brand , url , telephone , email  , image});

    brand.save()
        .then(() => res.json('Brand Add!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route("/allBrands").get(async (req, res) => {
        brand_main_Schema.find()
                .then(brand => res.json(brand))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/deleteBrand/:id").delete(async (req, res) => {
        let id = req.params.id;
        brand_main_Schema.findOneAndDelete({_id : id}).then(() => {
                res.status(200).send({status :"Brand Delted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

router.route("/BrandUpdate/:id").put(async (req,res) => {
        let id = req.params.id;
        const {Brand , url ,telephone, email,image}= req.body;

        const BrandUpdate={
                Brand , url ,telephone, email,image
        }
        const update = await brand_main_Schema.findByIdAndUpdate(id,BrandUpdate).then(() => {
            res.status(200).send({status :"Brand Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});


router.route("/search/:key").get(async (req, res) => {
        let result = await brand_main_Schema.find({
            "$or":[
                {Brand:{$regex:req.params.key}}
            ]
        })    
        res.send(result)
    });


module.exports = router;