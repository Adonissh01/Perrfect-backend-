const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const validator = require('validator');


// signup function
exports.signingUp = async (req, res) => {
    try {
        //1-check if the email is already valid
        let email = req.body.email;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'email is not valid' });
        }
        //2-check if a user already signed in using the same email 
        const checkEmail = await User.findOne({ email: req.body.email });

        if (checkEmail) {
            return res.status(400).json({ message: 'a user already signed in using this email' });

        }
        //3- check if a user already signed in using the same username
        const checkUsername = await User.findOne({ userName: req.body.userName });
        if (checkUsername) {
            return res.status(400).json({ message: 'a user already signed in using this username' });
        };
        //4-check if the password and confirm password match
        let pass = req.body.password;
        let passConfirm = req.body.passwordConfirm;

        if (pass != passConfirm) {
            res.status(400).json({ message: 'password and passwordConfirm do not match' });
        }
        else {
            //5-create the user
            const hashedPassword = await bcrypt.hash(pass, 12);

            const newUser = await User.create({
                fullName: req.body.fullName,
                userName: req.body.userName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hashedPassword,
                
                region: req.body.region,
                city:req.body.city,
                age:req.body.age,
                gender:req.body.gender
                
            });

            res.status(201).json({ message: "User created succesfully.", data: { newUser } })

        };
    } catch (err) {
        console.log(err);
    }
};

//signin function
exports.signingIn = async (req, res) => {
    try {
        const user = await User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }], });

        //   1-check if user already signed up on this website
        if (!user) {
            res.status(400).json({ message: 'user not found' });
        }
        // 2-check if the password is correct
        const comparePasswords = await bcrypt.compare(req.body.password, user.password);
      


        if (!comparePasswords) {
            return res.status(400).json({ message: "Incorrect credentials." });
        }
        else {
            return res.status(201).json({ message: 'you signed in successfully', data: user });
        }

    } catch (err) {
        console.log(err);
   }
}