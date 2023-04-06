const express = require('express');
const router = express.Router();
const Volunteer = require('../controllers/volunteerController');

router.post('/volunteer/CreateVolunteer', Volunteer.CreateVolunteer);
router.get('/volunteer/GetAllVolunteers',Volunteer.getAllVolunteers);
router.get('/volunteer/GetVolunteerByRegion/:region',Volunteer.getVolunteerByRegion);



module.exports = router;