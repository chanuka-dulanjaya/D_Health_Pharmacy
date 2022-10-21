const router = require('express').Router();
let employee_profile_schema = require('../models/user.employee.profile');
const systemReg = require('../models/systemReg');

router.route('/addEmployee').post((req,res) => {
    const username = req.body.username;
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const bod = req.body.bod;
    const nic = req.body.nic;
    const status = "Pending";

    const employee = new employee_profile_schema({username, name, address, phone, gender, bod, nic,status});

    employee.save()
       .then(() => {
            res.status(200).send({status :"Employee Added"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/allEmployees").get(async (req, res) => {
        employee_profile_schema.find({status: 'Approved'})
                .then(Employees => res.json(Employees))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allEmployees/:name").get(async (req, res) => {
      let name = req.params.name;
        employee_profile_schema.find({name: { $regex: ".*" + name + ".*"}})
                .then(Employees => res.json(Employees))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allEmployeesPending").get(async (req, res) => {
        employee_profile_schema.find({status: 'Pending'})
                .then(Employees => res.json(Employees))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/deleteEmployee/:username").delete(async (req, res) => {
        let username = req.params.username;
        employee_profile_schema.findOneAndDelete({username : username})
        .then(() => {
             systemReg.findOneAndDelete({username : username})
            .then(() => {
                    res.status(200).send({status :"Employee Delted"});
            }).catch((err) => {
                console.log(err);
                    res.status(500).send({status: "Error with Deleting Data",error: err.message});
            });
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

router.route("/updateEmployeSalary/:username").put(async (req,res) => {
        let username = req.params.username;
        const { salary,position}= req.body;
        const status = 'Approved';

        const salaryStatus={
               salary,position,status
        }
        const update = await employee_profile_schema.findOneAndUpdate({username:username},salaryStatus).then(() => {
            res.status(200).send({status :"Employee Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/updateEmployeProfile/:username").put(async (req,res) => {
        let username = req.params.username;
        const {address, phone,salary,position}= req.body;

        const EmployeProfile={
           address, phone,salary,position
        }
        const update = await employee_profile_schema.findOneAndUpdate({username:username},EmployeProfile).then(() => {
            res.status(200).send({status :"Employee Updated"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/rejectEmploye/:username").put(async (req,res) => {
        let username = req.params.username;
        const status = 'Reject';

        const employeeStatus={
          status
        }
        const update = await employee_profile_schema.findOneAndUpdate({username:username},employeeStatus).then(() => {
            res.status(200).send({status :"Reject Employee Registration"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/BlackList/:username").put(async (req,res) => {
        let username = req.params.username;
        const status = req.body.status;

        const employeeStatus={
          status
        }
        const update = await employee_profile_schema.findOneAndUpdate({username:username},employeeStatus).then(() => {
            res.status(200).send({status :"Black List Employee Registration"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Updating Data",error: err.message});
        });
});

router.route("/deleteEmployee/:username").delete(async (req, res) => {

        employee_profile_schema.findOneAndUpdate({username : req.params.username}).then(() => {
                res.status(200).send({status :"Employee Delted"});
        }).catch((err) => {
            console.log(err);
                res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

router.route("/allViewEmployees").get(async (req, res) => {
        employee_profile_schema.find({status: 'Approved'})
                .then(Employees => res.json(Employees))
                .catch(err => res.status(400).json('No Data'))
});

router.route("/allViewEmployeesBlackList").get(async (req, res) => {
        employee_profile_schema.find({status: 'BlackList'})
                .then(Employees => res.json(Employees))
                .catch(err => res.status(400).json('No Data'))
});
module.exports = router;