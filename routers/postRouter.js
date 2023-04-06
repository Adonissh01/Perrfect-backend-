const express = require('express');
const router = express.Router();
const Post = require('../controllers/postController');

router.post('/Post/CreatePost', Post.createPost);
router.get('/Post/GetAllPosts', Post.getAllPosts);
router.get('/Post/GetUserPosts/:userId', Post.getUsersPosts);
// router.delete('/Post/DeletePost/:userId', Post.deletePost);



module.exports = router;