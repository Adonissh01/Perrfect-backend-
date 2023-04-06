const Volunteer = require('../models/volunteerModel');
const User = require('../models/userModel');


//to become a volunteer you should already be a user
exports.CreateVolunteer = async (req, res) => {
    try {
        //1- check if logged in
        const checkUser = await User.findOne({ userName : req.body.userName});

        console.log(checkUser);

        if (!checkUser) {
            return res.status(400).json({ message : "You did not Login yet"});
        };
        const isVolunteer = await Volunteer.findOne({ userName: req.body.userName});
        console.log(isVolunteer);
        if(isVolunteer){
            return res.status(400).json({message : "You are already a volunteer"});

        };



        const newVolunteer = await Volunteer.create({
            _id: checkUser._id,
           
            userName : checkUser.userName,
            reason: req.body.reason,
            
            region: checkUser.region,
            city: checkUser.city,
            educationalBackground:req.body.educationalBackground,
            availability: req.body.availability,

            
        })
        console.log(newVolunteer);

        //const savedVolunteer = await newVolunteer.save();
        res.status(201).json({ message: 'Volunteer created successfully', data: newVolunteer });
    } catch(err) {
        console.log(err);
   }
};
exports.getAllVolunteers = async (req, res)=>{
    try{
        const volunteerList = await Volunteer.find();
        res.status(200).json({data: volunteerList})

    }catch(err){
        res.status(404).json({ message: err.message });
    }
}
exports.getVolunteerByRegion = async (req,res) =>{
try{
    
    const userRegion = await Volunteer.find({region:req.params.region});
   const count = userRegion.length;
   
    res.status(200).json({count:count,volunteers:userRegion});

}catch(err)
{
    console.log(err);
}
}