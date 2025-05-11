const express = require('express')
const router = express.Router();
const feedbackController = require('../../../controller/admin/CMS/feedbackCotroller')
const auth = require('../../../middleware/auth')
router.get('/fetch',auth.adminProtect,feedbackController.fetchFeedback)
router.post('/add',feedbackController.addFeedback)


module.exports = router 