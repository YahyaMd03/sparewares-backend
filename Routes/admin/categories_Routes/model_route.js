const express = require('express');
const router = express.Router();
const model = require('../../../controller/admin/categories_Controllers/model_controller')

router.post('/model_post', model.model_post);
router.get('/model_fetch', model.model_fetch);
router.get('/model_fetch/:id', model.model_fetch_id);
router.put('/update_model/:id', model.update_model_id);
router.delete('/delete_model/:id', model.delete_model);
module.exports = router