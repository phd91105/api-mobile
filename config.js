'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

// const {
//     // PORT,
//     // HOST,
//     // HOST_URL,
//     API_KEY,
//     AUTH_DOMAIN,
//     DATABASE_URL,
//     PROJECT_ID,
//     STORAGE_BUCKET,
//     MESSAGING_SENDER_ID,
//     APP_ID
// } = process.env;

// assert(PORT, 'PORT is required');
// assert(HOST, 'HOST is required');

module.exports = {
    // port: PORT,
    // host: HOST,
    // url: HOST_URL,
    firebaseConfig: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID
    }
}