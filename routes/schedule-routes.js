const express = require("express");
const APIHutech = require('../controllers/hutech');
const API = new APIHutech();
const router = express.Router();

router.get("/schedule", (req, res) => {
    var param = req.query.id;
    if (param != undefined) {
        (async () => {
            try {
                let schedule = await API.getSchedule(param);
                res.send(schedule);
            } catch (error) {
                res.send(error);
            }
        })();
    }
    else {
        res.status(400).send({ message: 'missing student id parameter' });
    }
});

module.exports = {
    routes: router
}