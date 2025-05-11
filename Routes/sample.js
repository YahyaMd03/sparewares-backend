const express = require('express');
const router = express.Router()
const sample = require('../controller/samplecontroller')


router.post('/addsample', sample.create_sample);

module.exports = router