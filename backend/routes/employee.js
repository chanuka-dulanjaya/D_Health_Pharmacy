const router = require('express').Router();
let employee_profile_schema = require('../models/user.employee.profile');
const systemReg = require('../models/systemReg');

router.route("/allViewEmployeesMale").get(async (req, res) => {
        employee_profile_schema.find({gender: 'Male'})
                .then(Employees => res.json(Employees))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allViewEmployeesFeMale").get(async (req, res) => {
        employee_profile_schema.find({gender: 'Female'})
                .then(Employees => res.json(Employees))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allViewEmployeesReject").get(async (req, res) => {
        employee_profile_schema.find({status: 'Reject'})
                .then(Employees => res.json(Employees))
                .catch(err => res.status(400).json('No Data'))
});
module.exports = router;