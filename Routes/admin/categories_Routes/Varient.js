const express = require('express');
const router = express.Router();
const varient = require('../../../controller/admin/categories_Controllers/varient_controller')

router.post('/varient_post', varient.varient_post);
router.get('/varient_fetch', varient.varient_fetch);
router.get('/varient_fetch/:id', varient.varient_fetch_id);
router.put('/update_varient/:id', varient.update_varient_id);
router.delete('/delete_varient/:id', varient.delete_varient);
module.exports = router