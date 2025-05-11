const express = require('express')
const router = express.Router()
const auth = require('../../../middleware/auth')
const dashboard = require('../../../controller/admin/dashboard/dashboardController')

router.get('/getDetails',auth.adminProtect, dashboard.getDashboardDetails)
router.get('/getgraphdetails' ,auth.adminProtect, dashboard.graphDetails)
router.get('/getradialdetails' ,auth.adminProtect, dashboard.fetchRadialData)
router.get('/getbardetailsforp' ,auth.adminProtect, dashboard.fetchBarGraphDetailsForP)
router.post('/filteredbardetailsforp' ,auth.adminProtect, dashboard.filteredBarGraphDetails)
router.get('/getbardetailsforc' ,auth.adminProtect, dashboard.fetchBarGraphDetailsForc)
router.get('/getnotification' ,auth.adminProtect, dashboard.fetchNotification)
router.post('/deletenotification' ,auth.adminProtect, dashboard.deleteNotification)

module.exports = router