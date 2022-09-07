const router = require('express').Router();
let channel_booking_schema = require('../models/channel.booking');

router.route('/addChannelBooking').post((req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const telephone1 = req.body.telephone1;
    const Doctor = req.body.Doctor;
    const Date = req.body.Date;
    const Time = req.body.Time;
    const MedicalCenter = req.body.MedicalCenter;
    const userName = req.body.userName;
    const status = "Send";

    const channel_booking = new channel_booking_schema({name, email, telephone1, Doctor,Date,Time, MedicalCenter, status,userName});

    channel_booking.save()
        .then(() => res.json('Channel Booking Add!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route("/deleteBook/:id").delete(async (req, res) => {
        let id = req.params.id;
        channel_booking_schema.findByIdAndDelete(id).then(() => {
                res.status(200).send({status :"Book Cancled"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with  Data",error: err.message});
        });
    });

router.route("/allChannelBooking").get(async (req, res) => {
        channel_booking_schema.find()
                .then(ChannelBooking => res.json(ChannelBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allChannelBooking/:userName").get(async (req, res) => {
        channel_booking_schema.find({userName : req.params.userName , status : 'Send'})
                .then(ChannelBooking => res.json(ChannelBooking))
                .catch(err => res.status(400).json('No Data'))
});


router.route("/allServiceUnBooking/:userName").get(async (req, res) => {
        channel_booking_schema.find({userName : req.params.userName , status : 'Unbooking'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allServiceUnbooking").get(async (req, res) => {
        channel_booking_schema.find({status : 'Unbooking'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/Channelbooking").get(async (req, res) => {
        channel_booking_schema.find({status : 'Send'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/ChannelbookingAccept").get(async (req, res) => {
        channel_booking_schema.find({status : 'Accept'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});



router.route("/ChannelbookingReject").get(async (req, res) => {
        channel_booking_schema.find({status : 'Reject'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});


router.route("/allServiceComplete").get(async (req, res) => {
        channel_booking_schema.find({status : 'Complete'})
                .then(ServiceBooking => res.json(ServiceBooking))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/statusUpdateServiceBooking/:id").put(async (req,res) => {
        let id = req.params.id;
        const status = 'Unbooking';

        const statusUpdate={
          status
        }
        const update = await channel_booking_schema.findByIdAndUpdate(id,statusUpdate).then(() => {
            res.status(200).send({status :"Status Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/statusUpdate/:id").put(async (req,res) => {
        let id = req.params.id;
        const status = req.body.status;

        const statusUpdate={
          status
        }
        const update = await channel_booking_schema.findByIdAndUpdate(id,statusUpdate).then(() => {
            res.status(200).send({status :"Status Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/AcceptUpdateServiceBooking/:id").put(async (req,res) => {
        let id = req.params.id;
        const status = 'Accept';

        const statusUpdate={
          status
        }
        const update = await channel_booking_schema.findByIdAndUpdate(id,statusUpdate).then(() => {
            res.status(200).send({status :"Status Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/editServiceBooking/:id").put(async (req,res) => {
        let id = req.params.id;
        const name = req.body.name;
        const email = req.body.email;
        const telephone1 = req.body.telephone1;
        const Doctor = req.body.Doctor;
        const Date = req.body.Date;
        const Time = req.body.Time;
        const MedicalCenter = req.body.Time;
       

        const statusUpdate={
                name, email, telephone1,Doctor,Date,Time,MedicalCenter
        }
        const update = await channel_booking_schema.findByIdAndUpdate(id,statusUpdate).then(() => {
            res.status(200).send({status :"Channel book Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/deleteChannelBooking/:id").delete(async (req, res) => {
        let id = req.params.id;
        channel_booking_schema.findByIdAndDelete(id)
        .then(() => {
                res.status(200).send({status :"Booking Delted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});


router.route("/search/:key").get(async (req, res) => {
        let result = await channel_booking_schema.find({
            "$or":[
                {name:{$regex:req.params.key}}
            ]
        })    
        res.send(result)
    });

module.exports = router;