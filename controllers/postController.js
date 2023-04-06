const Post = require('../models/postModel');
const User = require('../models/userModel');
const fs = require('fs');

//create post
exports.createPost = async (req, res) => {
    
    try {
        const { userId, reason, picturePath } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ msg: "A post must belong to a user" });
        }
        const newPost = await Post.create({
            userId : user._id,
            fullName: user.fullName,
            petAge: req.body.petAge,
            petBreed: req.body.petBreed,
            petGender: req.body.petGender,
            petName: req.body.petName,
            reason: req.body.reason
        })

        return res.status(201).json({ message: 'post created successfully ', data: newPost })

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}


//Get ALL THE POSTS FOUND
exports.getAllPosts = async (req, res) => {
    try {
        const post = await Post.find();
        const countPosts = post.length;
        res.status(200).json({count: countPosts , data:post});

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// GET THE POSTS OF THE USER
exports.getUsersPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

//function to delete post after 7 days of creation
exports.deletePost = async (req, res) => {

    const { userId } = req.params;
    const post = await Post.find({ userId })
    const postIndex = post.findIndex(post);
    const postDate = new Date(post[postIndex].createdAt);

    const currentDate = new Date();
    const timeDifference = (currentDate - postDate) / (1000 * 60 * 60 * 24);
    if (timeDifference > 7) {
        // Delete the post if it's older than 7 days
        post.splice(postIndex, 1);
        fs.writeFileSync('posts.json', JSON.stringify(posts)); // Write the updated JSON data back to the file

        res.status(200).json({ message: 'Post deleted successfully' });
        
    } else {
        // Return an error if the post is not older than 7 days
        res.status(400).json({
            error: 'Post is not yet 7 days old'
      });
    }
}