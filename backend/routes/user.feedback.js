const router = require('express').Router();
let feedback_schema = require('../models/user.feedback');
const mongoose = require('mongoose');

router.route('/addFeedback').post((req,res) => {
    const username = req.body.username;
    const start = req.body.start;
    const Feedback = req.body.Feedback;
    const FeedbackType = req.body.FeedbackType;
    const FeedBackAbout = req.body.FeedBackAbout;
    const feedbackId = (Math.random() + 1).toString(36).substring(7);

    const feedback = new feedback_schema({username, start, Feedback,FeedbackType,FeedBackAbout, feedbackId});

    feedback.save()
        .then(() => res.json('Feedback Add!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route("/allFeedback").get(async (req, res) => {
        feedback_schema.find()
                .then(Feedback => res.json(Feedback))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allFeedback/:name").get(async (req, res) => {
         const name = req.params.name;
        feedback_schema.find({username: { $regex: ".*" + name + ".*"}})
                .then(Feedback => res.json(Feedback))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allFeedbackNegative").get(async (req, res) => {
        feedback_schema.find({FeedbackType : 'Negative'})
                .then(Feedback => res.json(Feedback))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allFeedbackPositive").get(async (req, res) => {
        feedback_schema.find({FeedbackType : 'Positive'})
                .then(Feedback => res.json(Feedback))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allFeedbackYour/:id").get(async (req, res) => {
        feedback_schema.find({username: req.params.id})
                .then(Feedback => res.json(Feedback))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/deleteFeedback/:id").delete(async (req, res) => {
        let id = req.params.id;
        feedback_schema.findByIdAndDelete(id)
        .then(() => {
                res.status(200).send({status :"Feedback Delted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

router.route("/oneFeedback/:id").get(async (req, res) => {
        let id = req.params.id;
        feedback_schema.find({feedbackId : id})
                .then(Feedback => res.json(Feedback))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/editFeedback/:id").put(async (req,res) => {
        let id = req.params.id;
        const {start,Feedback}= req.body;

        const FeedbackEdited={
           start, Feedback
        }
        const update = await feedback_schema.findByIdAndUpdate(id,FeedbackEdited).then(() => {
            res.status(200).send({status :"Feedback Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/search/:key").get(async (req, res) => {
        let result = await feedback_schema.find({
            "$or":[
                {username:{$regex:req.params.key}}
            ]
        })    
        res.send(result)
    });

module.exports = router;