const express = require("express");
const APIHutech = require('../models/hutech');
const API = new APIHutech();
const router = express.Router();

router.get("/schedule/:id", (req, res) => {
    (async () => {
        try {
            let schedule = await API.getSchedule(req.params.id);
            res.send(schedule);
        } catch (error) {
            res.send(error);
        }
    })();

});

module.exports = {
    routes: router
}