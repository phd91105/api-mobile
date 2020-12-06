'use strict';

const firebase = require('../db');
const Account = require('../models/account');
const firestore = firebase.firestore();

// app.post('/api/login', async (req, res) => {
const login = async (req, res, next) => {
    const accounts = await firestore.collection('accounts');
    const user = user.find(Account => Account.username == req.body.username);
    if (user == null) {
        return res.status(400).send('User not exist!');
    }
    try {

    } catch {
        res.status(500).send();
    }
}