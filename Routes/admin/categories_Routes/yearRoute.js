const express = require('express')
const router = express.Router();
const yearController = require('../../../controller/admin/categories_Controllers/yearController')

router.post('/addyear',yearController.addYear)
router.get('/getallyear',yearController.getAllYear)
router.put('/updateyear/:id',yearController.updateYear)
router.delete('/deleteyear/:id',yearController.deleteYear)

module.exports = router